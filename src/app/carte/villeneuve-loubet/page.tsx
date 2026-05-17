import type { Metadata } from "next";
import Link from "next/link";
import { getMaisonBySlug } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl } from "@/lib/utils";
import { CarteHero } from "@/components/carte/CarteHero";
import { VilleneuveCoastIllustration } from "@/components/brand/illustrations/VilleneuveCoastIllustration";

const SLUG = "villeneuve-loubet" as const;
const maison = getMaisonBySlug(SLUG)!;
const menu = getMenuBySlug(SLUG);

export const metadata: Metadata = {
  title: `Carte ${maison.nom} — Maison Oléa`,
  description:
    "La carte de Maison Oléa Villeneuve-Loubet sera dévoilée à l'ouverture, entre mer et arrière-pays niçois.",
  alternates: { canonical: absoluteUrl(`/carte/${SLUG}`) },
  robots: { index: false, follow: true },
};

export default function CarteVilleneuveLoubetPage() {
  return (
    <>
      <CarteHero
        eyebrow="La carte"
        title={
          <>
            Villeneuve-Loubet,{" "}
            <span className="italic text-brand-gold-light">bientôt</span>.
          </>
        }
        baseline={menu.intro}
        breadcrumbs={[
          { href: "/", label: "Accueil" },
          { href: "/carte", label: "Carte" },
          { href: `/carte/${SLUG}`, label: maison.nom },
        ]}
        badge="Bientôt"
        illustration={<VilleneuveCoastIllustration className="h-full w-full" />}
      />

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-olive mb-6">En attente</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-ink mb-6">
            La carte se prépare.
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-10">
            Notre cheffe imagine en ce moment une carte azuréenne, fidèle à
            l&apos;esprit Oléa : produits de saison, simplicité méditerranéenne
            et saveurs partagées. Nous la dévoilerons ici dès l&apos;ouverture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/maisons/${SLUG}`}
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              Découvrir la maison
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
            >
              Être tenu informé
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
