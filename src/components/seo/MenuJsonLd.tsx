import type { MaisonMenu } from "@/data/menu";
import type { Maison } from "@/types/maison";
import { absoluteUrl } from "@/lib/utils";
import { type Locale, localeHtmlLang } from "@/i18n/config";
import { withLocale } from "@/i18n/locale-href";

type Props = {
  maison: Maison;
  menu: MaisonMenu;
  lang: Locale;
};

/**
 * JSON-LD schema.org/Menu, lié au Restaurant correspondant.
 * Aucune information de prix exportée (l'ancien site ne les publie pas).
 */
export function MenuJsonLd({ maison, menu, lang }: Props) {
  const carteUrl = absoluteUrl(withLocale(lang, `/carte/${maison.slug}`));
  const restaurantId = `${absoluteUrl(
    withLocale(lang, `/maisons/${maison.slug}`),
  )}#restaurant`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${carteUrl}#menu`,
    name: `Carte Maison Oléa ${maison.nom}`,
    url: carteUrl,
    inLanguage: localeHtmlLang(lang),
    isPartOf: {
      "@type": "Restaurant",
      "@id": restaurantId,
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
