import type { Maison } from "@/types/maison";
import type { Locale } from "./config";

export type LocalizedMaison = Omit<
  Maison,
  "label" | "description" | "badgeOuverture" | "cuisines"
> & {
  label: string;
  description: string;
  badgeOuverture?: string;
  cuisines: string[];
};

export function localizeMaison(maison: Maison, lang: Locale): LocalizedMaison {
  return {
    ...maison,
    label: maison.label[lang],
    description: maison.description[lang],
    badgeOuverture: maison.badgeOuverture?.[lang],
    cuisines: maison.cuisines[lang],
  };
}
