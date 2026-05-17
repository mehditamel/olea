import { jourFromIsoParis } from "@/lib/date-paris";

export const ANNULATION_DELAI_HEURES = 24;
export const GARANTIE_MONTANT_CENTS_PAR_PERSONNE = Number(
  process.env.GARANTIE_MONTANT_CENTS_DEFAUT ?? 3000,
);
export const SEUIL_CONVIVES_GARANTIE = 6;

const JOURS_GARANTIS = new Set(["vendredi", "samedi", "dimanche"] as const);

/**
 * Trigger empreinte CB : vendredi/samedi/dimanche OU convives ≥ 6.
 */
export function requiresGarantie(isoDate: string, convives: number): boolean {
  if (convives >= SEUIL_CONVIVES_GARANTIE) return true;
  const jour = jourFromIsoParis(isoDate);
  if (!jour) return false;
  return JOURS_GARANTIS.has(jour as "vendredi" | "samedi" | "dimanche");
}

export function montantGarantieCents(convives: number): number {
  return convives * GARANTIE_MONTANT_CENTS_PAR_PERSONNE;
}
