import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { jourFromIsoParis } from "@/lib/date-paris";
import type { Jour } from "@/types/maison";
import { sumConvivesActifsParService } from "./repository";

/**
 * Couverts max pour (maison, service, jour). Override par date si défini.
 * Retourne null si aucune limite n'est configurée (= illimité).
 */
export async function getCouvertsMax(
  maisonSlug: string,
  service: "dejeuner" | "diner",
  isoDate: string,
): Promise<number | null> {
  const supabase = getSupabaseAdmin();

  const { data: override, error: errOverride } = await supabase
    .from("capacites_overrides")
    .select("couverts_max")
    .eq("maison_slug", maisonSlug)
    .eq("date", isoDate)
    .eq("service", service)
    .maybeSingle();
  if (errOverride)
    throw new Error(`Capacite override fetch: ${errOverride.message}`);
  if (override) return (override as { couverts_max: number }).couverts_max;

  const jour = jourFromIsoParis(isoDate);
  if (!jour) return null;
  const { data, error } = await supabase
    .from("capacites")
    .select("couverts_max")
    .eq("maison_slug", maisonSlug)
    .eq("service", service)
    .eq("jour", jour satisfies Jour)
    .maybeSingle();
  if (error) throw new Error(`Capacite fetch: ${error.message}`);
  return data ? (data as { couverts_max: number }).couverts_max : null;
}

export type CapaciteCheck =
  | { ok: true; reste: number | null }
  | { ok: false; reste: number; max: number };

/**
 * Vérifie si on peut ajouter `convivesAjoutes` au service donné.
 * Si aucune capacité n'est définie pour ce jour, accepte (illimité).
 */
export async function checkCapacite(
  maisonSlug: string,
  isoDate: string,
  service: "dejeuner" | "diner",
  convivesAjoutes: number,
): Promise<CapaciteCheck> {
  const max = await getCouvertsMax(maisonSlug, service, isoDate);
  if (max === null) return { ok: true, reste: null };
  const dejaReserves = await sumConvivesActifsParService(
    maisonSlug,
    isoDate,
    service,
  );
  const reste = max - dejaReserves;
  if (convivesAjoutes <= reste) return { ok: true, reste: reste - convivesAjoutes };
  return { ok: false, reste, max };
}

export async function isCreneauBloque(
  maisonSlug: string,
  isoDate: string,
  heure: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("creneaux_bloques")
    .select("heure_debut, heure_fin")
    .eq("maison_slug", maisonSlug)
    .eq("date", isoDate);
  if (error) throw new Error(`Creneaux bloques fetch: ${error.message}`);
  return (data ?? []).some(
    (r) =>
      heure >= (r as { heure_debut: string }).heure_debut &&
      heure < (r as { heure_fin: string }).heure_fin,
  );
}
