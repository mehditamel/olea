import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getMaisonBySlug } from "@/data/maisons";
import { chargeNoShow } from "@/lib/stripe/charge";
import { sendReservationCancellation } from "@/lib/email";
import { logAudit } from "./audit";
import { logger } from "@/lib/logger";
import type { ReservationRow } from "./repository";
import type { ReservationStatut } from "./status";

type StaffContext = { userId: string; email: string };

export type StaffActionResult =
  | { ok: true; row: ReservationRow }
  | { ok: false; error: string };

const TERMINAL: ReadonlyArray<ReservationStatut> = [
  "cancelled_by_client",
  "cancelled_by_staff",
  "noshow",
  "honored",
  "expired",
];

function isTerminal(s: ReservationStatut) {
  return TERMINAL.includes(s);
}

export async function cancelByStaff(
  reservationId: string,
  staff: StaffContext,
  reason: string,
): Promise<StaffActionResult> {
  const supabase = getSupabaseAdmin();
  const { data: before, error: e1 } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();
  if (e1 || !before) {
    return { ok: false, error: "Réservation introuvable." };
  }
  const row = before as ReservationRow;
  if (isTerminal(row.statut)) {
    return {
      ok: false,
      error: `Statut ${row.statut} : action impossible.`,
    };
  }
  const { data: updated, error: e2 } = await supabase
    .from("reservations")
    .update({
      statut: "cancelled_by_staff",
      cancelled_at: new Date().toISOString(),
    })
    .eq("id", reservationId)
    .select("*")
    .single();
  if (e2) return { ok: false, error: e2.message };

  await logAudit({
    action: "cancel_by_staff",
    reservationId,
    actorId: staff.userId,
    before: { statut: row.statut },
    after: { statut: "cancelled_by_staff", reason },
  });

  const maison = getMaisonBySlug(row.maison_slug);
  if (maison) {
    await sendReservationCancellation({
      to: row.email,
      nom: row.nom,
      maisonNom: maison.nom,
      telephoneAffichage: maison.telephoneAffichage,
      date: row.date,
      heure: row.heure.slice(0, 5),
      byStaff: true,
      reason,
    });
  }
  return { ok: true, row: updated as ReservationRow };
}

export async function markNoShow(
  reservationId: string,
  staff: StaffContext,
  options: { chargeGuarantee: boolean },
): Promise<StaffActionResult> {
  const supabase = getSupabaseAdmin();
  const { data: before, error: e1 } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();
  if (e1 || !before) {
    return { ok: false, error: "Réservation introuvable." };
  }
  const row = before as ReservationRow;
  if (row.statut !== "confirmed") {
    return {
      ok: false,
      error: `No-show réservé aux résa confirmées (actuel : ${row.statut}).`,
    };
  }

  let chargeUpdates: Record<string, string | null> = {};
  let chargeAudit: Record<string, unknown> = {};

  if (
    options.chargeGuarantee &&
    row.requiert_garantie &&
    row.montant_garantie_cents &&
    row.stripe_customer_id &&
    row.stripe_payment_method_id
  ) {
    const result = await chargeNoShow({
      customerId: row.stripe_customer_id,
      paymentMethodId: row.stripe_payment_method_id,
      amountCents: row.montant_garantie_cents,
      reservationId: row.id,
    });
    if (result.ok) {
      chargeUpdates = {
        stripe_payment_intent_id: result.paymentIntentId,
        stripe_charge_id: result.chargeId,
      };
      chargeAudit = {
        charged: true,
        amount_cents: result.amount,
        payment_intent_id: result.paymentIntentId,
      };
      await logAudit({
        action: "noshow_charged",
        reservationId,
        actorId: staff.userId,
        after: chargeAudit,
      });
    } else {
      await logAudit({
        action: "noshow_charge_failed",
        reservationId,
        actorId: staff.userId,
        after: {
          error: result.error,
          code: result.code,
          payment_intent_id: result.paymentIntentId,
        },
      });
      logger.warn(
        { err: result.error, reservationId },
        "No-show charge failed; marking no-show anyway",
      );
      chargeAudit = { charged: false, error: result.error };
    }
  } else {
    chargeAudit = {
      charged: false,
      reason: options.chargeGuarantee
        ? "Manque garantie/CB enregistrée"
        : "Pas de prélèvement demandé",
    };
  }

  const { data: updated, error: e2 } = await supabase
    .from("reservations")
    .update({
      statut: "noshow",
      noshow_marked_at: new Date().toISOString(),
      noshow_marked_by: staff.userId,
      ...chargeUpdates,
    })
    .eq("id", reservationId)
    .select("*")
    .single();
  if (e2) return { ok: false, error: e2.message };

  await logAudit({
    action: "noshow_marked",
    reservationId,
    actorId: staff.userId,
    before: { statut: row.statut },
    after: { statut: "noshow", ...chargeAudit },
  });

  return { ok: true, row: updated as ReservationRow };
}

export async function markHonored(
  reservationId: string,
  staff: StaffContext,
): Promise<StaffActionResult> {
  const supabase = getSupabaseAdmin();
  const { data: before, error: e1 } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();
  if (e1 || !before) {
    return { ok: false, error: "Réservation introuvable." };
  }
  const row = before as ReservationRow;
  if (row.statut !== "confirmed") {
    return {
      ok: false,
      error: `Honored réservé aux résa confirmées (actuel : ${row.statut}).`,
    };
  }
  const { data: updated, error: e2 } = await supabase
    .from("reservations")
    .update({ statut: "honored" })
    .eq("id", reservationId)
    .select("*")
    .single();
  if (e2) return { ok: false, error: e2.message };
  await logAudit({
    action: "honored_marked",
    reservationId,
    actorId: staff.userId,
    before: { statut: row.statut },
    after: { statut: "honored" },
  });
  return { ok: true, row: updated as ReservationRow };
}

export async function updateStaffNotes(
  reservationId: string,
  staff: StaffContext,
  notes: string,
): Promise<StaffActionResult> {
  const supabase = getSupabaseAdmin();
  const { data: before, error: e1 } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();
  if (e1 || !before) {
    return { ok: false, error: "Réservation introuvable." };
  }
  const row = before as ReservationRow;
  const trimmed = notes.trim().slice(0, 2000);
  const { data: updated, error: e2 } = await supabase
    .from("reservations")
    .update({ notes_staff: trimmed || null })
    .eq("id", reservationId)
    .select("*")
    .single();
  if (e2) return { ok: false, error: e2.message };
  await logAudit({
    action: "notes_updated",
    reservationId,
    actorId: staff.userId,
    before: { notes_staff: row.notes_staff },
    after: { notes_staff: trimmed },
  });
  return { ok: true, row: updated as ReservationRow };
}
