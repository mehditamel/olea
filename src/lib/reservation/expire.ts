import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getStripe, isStripeConfigured } from "@/lib/stripe/server";
import { logAudit } from "./audit";
import { logger } from "@/lib/logger";
import type { ReservationRow } from "./repository";

const DEFAULT_TTL_MIN = Number(
  process.env.RESERVATION_PENDING_TTL_MIN ?? 30,
);

export type ExpireResult = {
  expired: number;
  errors: number;
  details: Array<{ id: string; error?: string }>;
};

/**
 * Passe à `expired` toutes les réservations `pending_card` créées il y a plus
 * de `RESERVATION_PENDING_TTL_MIN` minutes. Annule le SetupIntent Stripe
 * associé. Idempotent (peut être lancé en boucle sans effet de bord).
 */
export async function expireOldPendingReservations(
  ttlMinutes: number = DEFAULT_TTL_MIN,
): Promise<ExpireResult> {
  const supabase = getSupabaseAdmin();
  const threshold = new Date(Date.now() - ttlMinutes * 60_000).toISOString();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("statut", "pending_card")
    .lt("created_at", threshold)
    .limit(100);

  if (error) {
    logger.error({ err: error.message }, "expire fetch failed");
    return { expired: 0, errors: 1, details: [{ id: "-", error: error.message }] };
  }

  const rows = (data ?? []) as ReservationRow[];
  const result: ExpireResult = { expired: 0, errors: 0, details: [] };
  if (rows.length === 0) return result;

  const stripe = isStripeConfigured() ? getStripe() : null;

  for (const row of rows) {
    if (stripe && row.stripe_setup_intent_id) {
      try {
        await stripe.setupIntents.cancel(row.stripe_setup_intent_id);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // Si déjà canceled / succeeded, on ignore.
        if (!/canceled|succeeded/.test(message)) {
          logger.warn(
            { err: message, id: row.id },
            "SetupIntent cancel failed during expire",
          );
        }
      }
    }
    const { error: e2 } = await supabase
      .from("reservations")
      .update({ statut: "expired" })
      .eq("id", row.id)
      .eq("statut", "pending_card");
    if (e2) {
      result.errors++;
      result.details.push({ id: row.id, error: e2.message });
      continue;
    }
    result.expired++;
    result.details.push({ id: row.id });
    await logAudit({
      action: "expired",
      reservationId: row.id,
      before: { statut: "pending_card" },
      after: { statut: "expired", reason: `TTL ${ttlMinutes}min` },
    });
  }
  logger.info(
    { expired: result.expired, errors: result.errors },
    "expire pending reservations done",
  );
  return result;
}
