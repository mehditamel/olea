"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { findReservationByToken } from "@/lib/reservation/repository";
import { logger } from "@/lib/logger";

export async function cancelReservationAction(token: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect(`/reserver/cancel/${token}?error=config`);
  }
  const reservation = await findReservationByToken(token);
  if (!reservation) {
    redirect(`/reserver/cancel/${token}?error=notfound`);
  }
  if (
    reservation.statut === "cancelled_by_client" ||
    reservation.statut === "cancelled_by_staff"
  ) {
    redirect(`/reserver/cancel/${token}?status=already`);
  }
  if (
    reservation.statut === "noshow" ||
    reservation.statut === "honored" ||
    reservation.statut === "expired"
  ) {
    redirect(`/reserver/cancel/${token}?error=finalized`);
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("reservations")
    .update({
      statut: "cancelled_by_client",
      cancelled_at: new Date().toISOString(),
    })
    .eq("id", reservation.id);
  if (error) {
    logger.error({ err: error.message, id: reservation.id }, "Cancel failed");
    redirect(`/reserver/cancel/${token}?error=server`);
  }
  logger.info({ id: reservation.id }, "Reservation cancelled by client");
  revalidatePath(`/reserver/cancel/${token}`);
  redirect(`/reserver/cancel/${token}?status=done`);
}
