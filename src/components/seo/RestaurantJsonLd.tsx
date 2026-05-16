import type { Maison, Horaire, Jour } from "@/types/maison";
import { absoluteUrl } from "@/lib/utils";

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

export function RestaurantJsonLd({ maison }: { maison: Maison }) {
  const openingHoursSpecification = maison.horaires.flatMap((h) => {
    const items: Record<string, string>[] = [];
    const lunch = specForService(h, "dejeuner");
    const dinner = specForService(h, "diner");
    if (lunch) items.push(lunch);
    if (dinner) items.push(dinner);
    return items;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl(`/maisons/${maison.slug}#restaurant`),
    name: `Maison Oléa ${maison.nom}`,
    description: maison.description,
    url: absoluteUrl(`/maisons/${maison.slug}`),
    telephone: maison.telephone,
    ...(maison.photoHero ? { image: [absoluteUrl(maison.photoHero)] } : {}),
    priceRange: maison.fourchettePrix,
    servesCuisine: maison.cuisines,
    address: {
      "@type": "PostalAddress",
      streetAddress: maison.adresse,
      postalCode: maison.codePostal,
      addressLocality: maison.ville,
      addressCountry: maison.pays,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: maison.coordonnees.lat,
      longitude: maison.coordonnees.lng,
    },
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
