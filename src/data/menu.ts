import type { MaisonSlug } from "@/types/maison";
import { marseilleMenu } from "./menus/marseille";
import { cassisMenu } from "./menus/cassis";
import { villeneuveLoubetMenu } from "./menus/villeneuve-loubet";

/**
 * Modèle de la carte. Le champ `prix` est volontairement optionnel : le site
 * d'origine ne l'affiche pas, on garde la même posture en attendant que les
 * maisons valident la grille tarifaire (v1.1).
 */
export type Dish = {
  readonly nom: string;
  readonly description?: string;
  readonly prix?: string;
};

export type MenuSection = {
  readonly slug: string;
  readonly titre: string;
  readonly plats: readonly Dish[];
};

export type WineColour = "Blancs" | "Rosés" | "Rouges" | "Champagne";

export type WineGroup = {
  readonly couleur: WineColour;
  readonly cuvees: readonly string[];
};

export type MaisonMenu = {
  readonly slug: MaisonSlug;
  readonly statut: "publiee" | "en-attente";
  readonly intro?: string;
  readonly sections: readonly MenuSection[];
  readonly vins?: readonly WineGroup[];
};

export const menus: Readonly<Record<MaisonSlug, MaisonMenu>> = {
  marseille: marseilleMenu,
  cassis: cassisMenu,
  "villeneuve-loubet": villeneuveLoubetMenu,
};

export function getMenuBySlug(slug: MaisonSlug): MaisonMenu {
  return menus[slug];
}
