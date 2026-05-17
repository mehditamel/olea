import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { getMaisonBySlug } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl } from "@/lib/utils";
import { CarteHero } from "@/components/carte/CarteHero";
import { MenuSection } from "@/components/carte/MenuSection";
import { WineList } from "@/components/carte/WineList";
import { MenuJsonLd } from "@/components/seo/MenuJsonLd";
import { CassisPortIllustration } from "@/components/brand/illustrations/CassisPortIllustration";

const SLUG = "cassis" as const;
const maison = getMaisonBySlug(SLUG)!;
const menu = getMenuBySlug(SLUG);

export const metadata: Metadata = {
  title: `Carte ${maison.nom} — Maison Oléa`,
  description:
    "La carte de Maison Oléa Cassis, sur le port : poissons, fruits de mer, pâtes, viandes maturées et cave méditerranéenne.",
  alternates: { canonical: absoluteUrl(`/carte/${SLUG}`) },
  openGraph: {
    title: `Carte Maison Oléa ${maison.nom}`,
    description: menu.intro,
    url: absoluteUrl(`/carte/${SLUG}`),
    type: "website",
    locale: "fr_FR",
  },
};

export default function CarteCassisPage() {
  return (
    <>
      <MenuJsonLd maison={maison} menu={menu} />
      <CarteHero
        eyebrow="La carte"
        title={
          <>
            Cassis,{" "}
            <span className="italic text-brand-gold-light">sur le port</span>.
          </>
        }
        baseline={menu.intro}
        breadcrumbs={[
          { href: "/", label: "Accueil" },
          { href: "/carte", label: "Carte" },
          { href: `/carte/${SLUG}`, label: maison.nom },
        ]}
        illustration={<CassisPortIllustration className="h-full w-full" />}
      />

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
          {menu.sections.map((section) => (
            <MenuSection key={section.slug} section={section} />
          ))}

          {menu.vins ? <WineList vins={menu.vins} /> : null}

          <div className="border-t border-brand-ink/15 pt-12 text-center">
            <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-7 max-w-2xl mx-auto">
              Les pêches du jour et la cave évoluent au fil des saisons.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${maison.telephone}`}
                className="inline-flex items-center gap-2 bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                Réserver — {maison.telephoneAffichage}
              </a>
              <Link
                href={`/maisons/${SLUG}`}
                className="inline-flex items-center justify-center border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
              >
                Découvrir la maison
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
