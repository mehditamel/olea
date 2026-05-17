import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { maisons } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl, cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MarseillePortIllustration } from "@/components/brand/illustrations/MarseillePortIllustration";
import { CassisPortIllustration } from "@/components/brand/illustrations/CassisPortIllustration";
import { VilleneuveCoastIllustration } from "@/components/brand/illustrations/VilleneuveCoastIllustration";
import type { MaisonSlug } from "@/types/maison";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "Découvrez la carte de chaque Maison Oléa : Marseille face au Vieux-Port, Cassis sur le port, Villeneuve-Loubet (ouverture prochaine).",
  alternates: { canonical: absoluteUrl("/carte") },
};

const ILLUSTRATIONS: Record<MaisonSlug, ReactNode> = {
  marseille: <MarseillePortIllustration className="h-full w-full" />,
  cassis: <CassisPortIllustration className="h-full w-full" />,
  "villeneuve-loubet": <VilleneuveCoastIllustration className="h-full w-full" />,
};

export default function CartePage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/carte", label: "Carte" },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">La carte</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Une cuisine née du{" "}
            <span className="italic text-brand-gold-light">soleil</span> et de
            la terre.
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            Chaque Maison Oléa décline la même promesse méditerranéenne, à sa
            façon. Choisissez la carte que vous souhaitez découvrir.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {maisons.map((maison) => {
              const menu = getMenuBySlug(maison.slug);
              const disponible = menu.statut === "publiee";
              const href = `/carte/${maison.slug}`;
              return (
                <li key={maison.slug}>
                  <Link
                    href={href}
                    className="group block bg-brand-cream-soft border border-brand-ink/10 hover:border-brand-olive/40 transition-colors"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
                      {ILLUSTRATIONS[maison.slug]}
                      {!disponible ? (
                        <span className="absolute top-3 left-3 bg-brand-gold text-brand-ink text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-semibold">
                          Bientôt
                        </span>
                      ) : null}
                    </div>
                    <div className="p-6 md:p-7">
                      <p className="eyebrow text-brand-gold-deep mb-2">
                        {maison.label}
                      </p>
                      <h2 className="font-serif text-2xl md:text-[28px] text-brand-ink mb-3">
                        {maison.nom}
                      </h2>
                      <p className="text-[15px] leading-[1.65] text-brand-text-muted mb-5">
                        {maison.description}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
                          disponible
                            ? "text-brand-ink group-hover:text-brand-olive"
                            : "text-brand-text-muted",
                        )}
                      >
                        {disponible ? "Voir la carte" : "Bientôt disponible"}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 md:mt-20 text-center border-t border-brand-ink/15 pt-12">
            <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-7 max-w-2xl mx-auto">
              La carte évolue au gré des saisons et des arrivages.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
