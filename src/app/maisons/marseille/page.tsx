import type { Metadata } from "next";
import { MaisonPage } from "@/components/maison/MaisonPage";
import { getMaisonBySlug } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

const SLUG = "marseille" as const;
const maison = getMaisonBySlug(SLUG)!;

export const metadata: Metadata = {
  title: `${maison.nom} — Restaurant méditerranéen Vieux-Port`,
  description:
    "Maison Oléa Marseille : la maison-mère, face au Vieux-Port. Terrasse bordée d'oliviers, cuisine provençale et produits frais.",
  alternates: { canonical: absoluteUrl(`/maisons/${SLUG}`) },
  openGraph: {
    title: `Maison Oléa ${maison.nom}`,
    description: maison.description,
    url: absoluteUrl(`/maisons/${SLUG}`),
    type: "website",
    locale: "fr_FR",
    images: maison.photoHero
      ? [
          {
            url: absoluteUrl(maison.photoHero),
            alt: `Maison Oléa ${maison.nom}`,
          },
        ]
      : undefined,
  },
};

export default function MarseillePage() {
  return <MaisonPage slug={SLUG} />;
}
