import type { Maison, Horaire, Jour } from "@/types/maison";
import { absoluteUrl } from "@/lib/utils";
import { type Locale, localeHtmlLang } from "@/i18n/config";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

const JOUR_SCHEMA: Record<Jour, string> = {
  lundi: "Monday",
  mardi: "Tuesday",
  mercredi: "Wednesday",
  jeudi: "Thursday",
  vendredi: "Friday",
  samedi: "Saturday",
  dimanche: "Sunday",
};

function specForService(
  horaire: Horaire,
  service: "dejeuner" | "diner",
): Record<string, string> | null {
  const range = horaire[service];
  if (!range) return null;
  const parts = range.split("-");
  const opens = parts[0];
  const closes = parts[1];
  if (!opens || !closes) return null;
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: JOUR_SCHEMA[horaire.jour],
    opens,
    closes,
  };
}

export function RestaurantJsonLd({
  maison,
  lang,
}: {
  maison: Maison;
  lang: Locale;
}) {
  const m = localizeMaison(maison, lang);
  const openingHoursSpecification = maison.horaires.flatMap((h) => {
    const items: Record<string, string>[] = [];
    const lunch = specForService(h, "dejeuner");
    const dinner = specForService(h, "diner");
    if (lunch) items.push(lunch);
    if (dinner) items.push(dinner);
    return items;
  });

  const sameAs = m.instagram?.url ? [m.instagram.url] : undefined;
  const urlLocalized = absoluteUrl(withLocale(lang, `/maisons/${m.slug}`));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${urlLocalized}#restaurant`,
    name: `Maison Oléa ${m.nom}`,
    description: m.description,
    inLanguage: localeHtmlLang(lang),
    url: urlLocalized,
    telephone: m.telephone,
    ...(m.photoHero ? { image: [absoluteUrl(m.photoHero)] } : {}),
    priceRange: m.fourchettePrix,
    servesCuisine: m.cuisines,
    address: {
      "@type": "PostalAddress",
      streetAddress: m.adresse,
      postalCode: m.codePostal,
      addressLocality: m.ville,
      addressCountry: m.pays,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: m.coordonnees.lat,
      longitude: m.coordonnees.lng,
    },
    ...(openingHoursSpecification.length > 0
      ? { openingHoursSpecification }
      : {}),
    ...(sameAs ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
