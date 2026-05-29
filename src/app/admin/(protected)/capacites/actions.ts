"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentStaff } from "@/lib/auth/staff";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { maisonSlugSchema } from "@/types/maison";

const SERVICES = ["dejeuner", "diner"] as const;
const JOURS = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
] as const;

async function requireStaff() {
  const supabase = await createSupabaseServerClient();
  const staff = await getCurrentStaff(supabase);
  if (!staff) throw new Error("Non autorisé.");
  return staff;
}

const baseSchema = z.object({
  maison_slug: maisonSlugSchema,
  service: z.enum(SERVICES),
  jour: z.enum(JOURS),
  couverts_max: z.coerce.number().int().min(0).max(500),
});

export async function upsertCapaciteAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  const parsed = baseSchema.safeParse({
    maison_slug: formData.get("maison_slug"),
    service: formData.get("service"),
    jour: formData.get("jour"),
    couverts_max: formData.get("couverts_max"),
  });
  if (!parsed.success) {
    return { ok: false, error: "Champs invalides." };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("capacites")
    .upsert(
      { ...parsed.data, updated_at: new Date().toISOString() },
      { onConflict: "maison_slug,service,jour" },
    );
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/capacites");
  return { ok: true };
}

const overrideSchema = z.object({
  maison_slug: maisonSlugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  service: z.enum(SERVICES),
  couverts_max: z.coerce.number().int().min(0).max(500),
  raison: z.string().max(200).optional().nullable(),
});

export async function upsertOverrideAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  const parsed = overrideSchema.safeParse({
    maison_slug: formData.get("maison_slug"),
    date: formData.get("date"),
    service: formData.get("service"),
    couverts_max: formData.get("couverts_max"),
    raison: formData.get("raison") || null,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("capacites_overrides")
    .upsert(
      { ...parsed.data, updated_at: new Date().toISOString() },
      { onConflict: "maison_slug,date,service" },
    );
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/capacites");
  return { ok: true };
}

export async function deleteOverrideAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  const maison_slug = String(formData.get("maison_slug") ?? "");
  const date = String(formData.get("date") ?? "");
  const service = String(formData.get("service") ?? "");
  if (!maison_slug || !date || !service) {
    return { ok: false, error: "Paramètres manquants." };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("capacites_overrides")
    .delete()
    .eq("maison_slug", maison_slug)
    .eq("date", date)
    .eq("service", service);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/capacites");
  return { ok: true };
}

const blocageSchema = z.object({
  maison_slug: maisonSlugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  heure_debut: z.string().regex(/^\d{2}:\d{2}$/, "Heure invalide"),
  heure_fin: z.string().regex(/^\d{2}:\d{2}$/, "Heure invalide"),
  raison: z.string().max(200).optional().nullable(),
});

export async function addBlocageAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const staff = await requireStaff();
  const parsed = blocageSchema.safeParse({
    maison_slug: formData.get("maison_slug"),
    date: formData.get("date"),
    heure_debut: formData.get("heure_debut"),
    heure_fin: formData.get("heure_fin"),
    raison: formData.get("raison") || null,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }
  if (parsed.data.heure_fin <= parsed.data.heure_debut) {
    return { ok: false, error: "Heure de fin doit être après l'heure de début." };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("creneaux_bloques").insert({
    ...parsed.data,
    heure_debut: `${parsed.data.heure_debut}:00`,
    heure_fin: `${parsed.data.heure_fin}:00`,
    created_by: staff.userId,
  });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/capacites");
  return { ok: true };
}

export async function deleteBlocageAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "ID manquant." };
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("creneaux_bloques").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/capacites");
  return { ok: true };
}
