import type { Metadata } from "next";
import Link from "next/link";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos trois maisons",
  description:
    "Maison Oléa à Marseille, Cassis et Villeneuve-Loubet : trois adresses méditerranéennes, une même cuisine sincère inspirée du Sud.",
  alternates: { canonical: absoluteUrl("/maisons") },
};

export default function MaisonsIndexPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-gold mb-5">Nos trois maisons</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            De la Provence à la{" "}
            <span className="italic text-brand-gold-light">Côte d&apos;Azur</span>
          </h1>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {maisons.map((maison) => (
            <Link
              key={maison.slug}
              href={`/maisons/${maison.slug}`}
              className="group flex flex-col bg-white border border-brand-ink/8 hover:border-brand-olive transition-colors"
            >
              <div
                className="relative h-[280px]"
                style={{
                  background: `
                    linear-gradient(to bottom, rgba(31,34,24,0.1) 0%, rgba(31,34,24,0.8) 100%),
                    radial-gradient(ellipse at 50% 40%, ${maison.accent} 0%, rgba(31,34,24,0.4) 70%, #1F2218 100%)
                  `,
                }}
                aria-hidden
              >
                {maison.badgeOuverture && (
                  <span className="absolute top-5 right-5 bg-brand-gold text-brand-ink text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 font-semibold">
                    {maison.badgeOuverture}
                  </span>
                )}
                <div className="absolute bottom-6 left-6">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-2">
                    {maison.label}
                  </p>
                  <h2 className="font-serif text-3xl text-brand-cream leading-tight">
                    {maison.nom}
                  </h2>
                </div>
              </div>
              <div className="p-6 flex-1">
                <p className="text-xs text-brand-text-muted mb-3">
                  {maison.adresse}, {maison.codePostal}
                </p>
                <p className="text-sm leading-relaxed text-brand-ink/80">
                  {maison.description}
                </p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-brand-olive group-hover:text-brand-ink transition-colors">
                  Découvrir →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
