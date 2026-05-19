import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";

export type AuditAction =
  | "create_reservation"
  | "cancel_by_client"
  | "cancel_by_staff"
  | "noshow_marked"
  | "noshow_charged"
  | "noshow_charge_failed"
  | "honored_marked"
  | "notes_updated"
  | "stripe_setup_succeeded"
  | "stripe_setup_failed"
  | "stripe_setup_canceled"
  | "expired";

export async function logAudit(input: {
  action: AuditAction;
  reservationId: string;
  actorId?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("audit_log").insert({
      action: input.action,
      reservation_id: input.reservationId,
      actor_id: input.actorId ?? null,
      before: input.before ?? null,
      after: input.after ?? null,
    });
    if (error) {
      logger.warn(
        { err: error.message, action: input.action },
        "audit_log insert failed",
      );
    }
  } catch (err) {
    logger.warn(
      { err: err instanceof Error ? err.message : String(err) },
      "audit_log exception",
    );
  }
}
