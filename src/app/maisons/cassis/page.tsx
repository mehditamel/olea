import type { Metadata } from "next";
import { MaisonPage } from "@/components/maison/MaisonPage";
import { getMaisonBySlug } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

const SLUG = "cassis" as const;
const maison = getMaisonBySlug(SLUG)!;

export const metadata: Metadata = {
  title: `${maison.nom} — Restaurant méditerranéen face aux Calanques`,
  description:
    "Maison Oléa Cassis : sur le port, face aux pointus et à la falaise des Calanques. Cuisine méditerranéenne et poissons frais.",
  alternates: { canonical: absoluteUrl(`/maisons/${SLUG}`) },
  openGraph: {
    title: `Maison Oléa ${maison.nom}`,
    description: maison.description,
    url: absoluteUrl(`/maisons/${SLUG}`),
    type: "website",
    locale: "fr_FR",
  },
};

export default function CassisPage() {
  return <MaisonPage slug={SLUG} />;
}
