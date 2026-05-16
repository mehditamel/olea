import type { Metadata } from "next";
import { MaisonPage } from "@/components/maison/MaisonPage";
import { getMaisonBySlug } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

const SLUG = "villeneuve-loubet" as const;
const maison = getMaisonBySlug(SLUG)!;

export const metadata: Metadata = {
  title: `${maison.nom} — Brasserie restaurant Côte d'Azur`,
  description:
    "Maison Oléa Villeneuve-Loubet : notre nouvelle brasserie restaurant azuréenne, entre mer et arrière-pays niçois. Ouverture prochaine.",
  alternates: { canonical: absoluteUrl(`/maisons/${SLUG}`) },
  openGraph: {
    title: `Maison Oléa ${maison.nom}`,
    description: maison.description,
    url: absoluteUrl(`/maisons/${SLUG}`),
    type: "website",
    locale: "fr_FR",
  },
};

export default function VilleneuveLoubetPage() {
  return <MaisonPage slug={SLUG} />;
}
