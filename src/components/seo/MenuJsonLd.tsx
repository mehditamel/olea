import type { MaisonMenu } from "@/data/menu";
import type { Maison } from "@/types/maison";
import { absoluteUrl } from "@/lib/utils";

type Props = {
  maison: Maison;
  menu: MaisonMenu;
};

/**
 * JSON-LD schema.org/Menu, lié au Restaurant correspondant.
 * Aucune information de prix exportée (l'ancien site ne les publie pas).
 */
export function MenuJsonLd({ maison, menu }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Carte Maison Oléa ${maison.nom}`,
    url: absoluteUrl(`/carte/${maison.slug}`),
    inLanguage: "fr-FR",
    isPartOf: {
      "@type": "Restaurant",
      "@id": absoluteUrl(`/maisons/${maison.slug}#restaurant`),
      name: `Maison Oléa ${maison.nom}`,
    },
    hasMenuSection: menu.sections.map((section) => ({
      "@type": "MenuSection",
      name: section.titre,
      hasMenuItem: section.plats.map((dish) => ({
        "@type": "MenuItem",
        name: dish.nom,
        ...(dish.description ? { description: dish.description } : {}),
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
