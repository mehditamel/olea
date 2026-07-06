import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ReservationStatut } from "./status";
import { ACTIVE_STATUTS } from "./status";

export type ReservationRow = {
  id: string;
  maison_slug: string;
  date: string;
  heure: string;
  service: "dejeuner" | "diner";
  convives: number;
  nom: string;
  email: string;
  telephone: string;
  occasion: string;
  demandes: string;
  statut: ReservationStatut;
  requiert_garantie: boolean;
  montant_garantie_cents: number | null;
  stripe_customer_id: string | null;
  stripe_setup_intent_id: string | null;
  stripe_payment_method_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  cancellation_token: string;
  cancelled_at: string | null;
  noshow_marked_at: string | null;
  noshow_marked_by: string | null;
  reminder_sent_at: string | null;
  notes_staff: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

export type ReservationInsert = {
  maison_slug: string;
  date: string;
  heure: string;
  service: "dejeuner" | "diner";
  convives: number;
  nom: string;
  email: string;
  telephone: string;
  occasion: string;
  demandes: string;
  statut: ReservationStatut;
  requiert_garantie: boolean;
  montant_garantie_cents: number | null;
  source?: string;
};

export async function insertReservation(
  data: ReservationInsert,
): Promise<ReservationRow> {
  const supabase = getSupabaseAdmin();
  const { data: row, error } = await supabase
    .from("reservations")
    .insert(data)
    .select("*")
    .single();
  if (error) throw new Error(`Insert reservation failed: ${error.message}`);
  return row as ReservationRow;
}

export type ReserverCreneauResult =
  | { ok: true; row: ReservationRow }
  | { ok: false; reason: "capacite"; reste: number; max: number }
  | { ok: false; reason: "rpc_absent" };

/**
 * Vérifie la capacité et insère la réservation atomiquement, via le RPC
 * `reserver_creneau` (verrou consultatif par créneau). Élimine la course
 * TOCTOU du couple checkCapacite()+insertReservation().
 *
 * Si la migration SQL n'est pas encore appliquée en base, le RPC est absent
 * (PGRST202) et l'appelant doit retomber sur le chemin legacy non atomique.
 */
export async function reserverCreneauAtomique(
  data: ReservationInsert,
): Promise<ReserverCreneauResult> {
  const supabase = getSupabaseAdmin();
  const { data: result, error } = await supabase.rpc("reserver_creneau", {
    p_maison: data.maison_slug,
    p_date: data.date,
    p_heure: data.heure,
    p_service: data.service,
    p_convives: data.convives,
    p_nom: data.nom,
    p_email: data.email,
    p_telephone: data.telephone,
    p_occasion: data.occasion,
    p_demandes: data.demandes,
    p_statut: data.statut,
    p_requiert_garantie: data.requiert_garantie,
    p_montant_garantie_cents: data.montant_garantie_cents,
    p_source: data.source ?? "web",
  });
  if (error) {
    if (error.code === "PGRST202") return { ok: false, reason: "rpc_absent" };
    throw new Error(`reserver_creneau failed: ${error.message}`);
  }
  const payload = result as
    | { ok: true; reservation: ReservationRow }
    | { ok: false; reste: number; max: number };
  if (payload.ok) return { ok: true, row: payload.reservation };
  return {
    ok: false,
    reason: "capacite",
    reste: payload.reste,
    max: payload.max,
  };
}

export async function findReservationByToken(
  token: string,
): Promise<ReservationRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("cancellation_token", token)
    .maybeSingle();
  if (error) throw new Error(`Find reservation failed: ${error.message}`);
  return (data as ReservationRow | null) ?? null;
}

export async function sumConvivesActifsParService(
  maisonSlug: string,
  date: string,
  service: "dejeuner" | "diner",
): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select("convives")
    .eq("maison_slug", maisonSlug)
    .eq("date", date)
    .eq("service", service)
    .in("statut", ACTIVE_STATUTS as unknown as string[]);
  if (error) throw new Error(`Count convives failed: ${error.message}`);
  return (data ?? []).reduce(
    (acc, r) => acc + ((r as { convives: number }).convives ?? 0),
    0,
  );
}

export async function attachStripeIds(
  reservationId: string,
  ids: {
    customerId?: string;
    setupIntentId?: string;
    paymentMethodId?: string;
    paymentIntentId?: string;
    chargeId?: string;
  },
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const update: Record<string, string | null> = {};
  if (ids.customerId !== undefined) update.stripe_customer_id = ids.customerId;
  if (ids.setupIntentId !== undefined)
    update.stripe_setup_intent_id = ids.setupIntentId;
  if (ids.paymentMethodId !== undefined)
    update.stripe_payment_method_id = ids.paymentMethodId;
  if (ids.paymentIntentId !== undefined)
    update.stripe_payment_intent_id = ids.paymentIntentId;
  if (ids.chargeId !== undefined) update.stripe_charge_id = ids.chargeId;
  const { error } = await supabase
    .from("reservations")
    .update(update)
    .eq("id", reservationId);
  if (error) throw new Error(`Attach stripe ids failed: ${error.message}`);
}

/**
 * Transition de statut. `ifStatut` rend l'update conditionnel (aucune écriture
 * si le statut a changé entre-temps) — retourne false dans ce cas.
 */
export async function updateStatut(
  reservationId: string,
  statut: ReservationStatut,
  options?: { ifStatut?: ReservationStatut },
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("reservations")
    .update({ statut })
    .eq("id", reservationId);
  if (options?.ifStatut) query = query.eq("statut", options.ifStatut);
  const { data, error } = await query.select("id");
  if (error) throw new Error(`Update statut failed: ${error.message}`);
  return (data ?? []).length > 0;
}

export async function findReservationBySetupIntent(
  setupIntentId: string,
): Promise<ReservationRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("stripe_setup_intent_id", setupIntentId)
    .maybeSingle();
  if (error) throw new Error(`Find by setup_intent failed: ${error.message}`);
  return (data as ReservationRow | null) ?? null;
}

export async function findReservationById(
  id: string,
): Promise<ReservationRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Find by id failed: ${error.message}`);
  return (data as ReservationRow | null) ?? null;
}
