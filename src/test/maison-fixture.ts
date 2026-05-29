import { LOCALES } from "@/i18n/config";
import type {
  LocalizedString,
  LocalizedStringArray,
  Maison,
} from "@/types/maison";

/** Construit une chaîne localisée identique sur les 7 locales (helper de test). */
function loc(value: string): LocalizedString {
  return Object.fromEntries(
    LOCALES.map((l) => [l, value]),
  ) as LocalizedString;
}

function locArray(values: string[]): LocalizedStringArray {
  return Object.fromEntries(
    LOCALES.map((l) => [l, values]),
  ) as LocalizedStringArray;
}

/**
 * Fabrique une maison valide pour les tests, surchargeable champ par champ.
 * Évite de coupler les tests à `src/data/maisons.ts` (dont le contenu évolue).
 */
export function makeMaison(overrides: Partial<Maison> = {}): Maison {
  return {
    slug: "marseille",
    nom: "Maison Test",
    label: loc("Maison-mère"),
    adresse: "8 Rue Euthymènes",
    codePostal: "13001",
    ville: "Marseille",
    pays: "FR",
    telephone: "+33600000000",
    telephoneAffichage: "06 00 00 00 00",
    coordonnees: { lat: 43.2951, lng: 5.3735 },
    description: loc("Une maison méditerranéenne."),
    ouvert: true,
    horaires: [],
    fourchettePrix: "€€",
    cuisines: locArray(["Méditerranéen"]),
    fermetureHebdo: [],
    photoHero: "/images/test/hero.jpg",
    photos: [],
    accent: "#75774A",
    reservationUrl: "",
    ...overrides,
  };
}
