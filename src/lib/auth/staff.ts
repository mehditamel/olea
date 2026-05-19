import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type StaffProfile = {
  userId: string;
  email: string;
  role: "admin" | "manager" | "host";
  maisonSlugs: string[];
};

/**
 * Charge le profil staff de l'utilisateur courant. Retourne null si non staff.
 */
export async function getCurrentStaff(
  supabase: SupabaseClient,
): Promise<StaffProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  const { data, error } = await supabase
    .from("staff_users")
    .select("user_id, role, maison_slugs")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as {
    user_id: string;
    role: "admin" | "manager" | "host";
    maison_slugs: string[];
  };
  return {
    userId: row.user_id,
    email: user.email,
    role: row.role,
    maisonSlugs: row.maison_slugs,
  };
}
