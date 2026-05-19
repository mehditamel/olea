"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentStaff } from "@/lib/auth/staff";
import {
  cancelByStaff,
  markHonored,
  markNoShow,
  updateStaffNotes,
} from "@/lib/reservation/staff-actions";

const idSchema = z.string().uuid();

async function requireStaff() {
  const supabase = await createSupabaseServerClient();
  const staff = await getCurrentStaff(supabase);
  if (!staff) {
    throw new Error("Non autorisé.");
  }
  return staff;
}

function pathOf(id: string) {
  return `/admin/reservations/${id}`;
}

export async function cancelReservationAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const staff = await requireStaff();
  const id = idSchema.parse(formData.get("id"));
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 500);
  const result = await cancelByStaff(id, staff, reason || "Annulation par l'équipe.");
  revalidatePath(pathOf(id));
  revalidatePath("/admin");
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function markNoShowAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const staff = await requireStaff();
  const id = idSchema.parse(formData.get("id"));
  const chargeGuarantee = formData.get("charge") === "1";
  const result = await markNoShow(id, staff, { chargeGuarantee });
  revalidatePath(pathOf(id));
  revalidatePath("/admin");
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function markHonoredAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const staff = await requireStaff();
  const id = idSchema.parse(formData.get("id"));
  const result = await markHonored(id, staff);
  revalidatePath(pathOf(id));
  revalidatePath("/admin");
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function updateNotesAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const staff = await requireStaff();
  const id = idSchema.parse(formData.get("id"));
  const notes = String(formData.get("notes") ?? "");
  const result = await updateStaffNotes(id, staff, notes);
  revalidatePath(pathOf(id));
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}
