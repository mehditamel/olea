import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MaisonStatusPill } from "@/components/maison/MaisonStatusPill";

export const metadata: Metadata = {
  title: "Nos trois maisons",
  description:
    "Maison Oléa à Marseille, Cassis et Villeneuve-Loubet : trois adresses méditerranéennes, une même cuisine sincère inspirée du Sud.",
  alternates: { canonical: absoluteUrl("/maisons") },
};

export default function MaisonsIndexPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/maisons", label: "Maisons" },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">Nos trois maisons</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            De la Provence à la{" "}
            <span className="italic text-brand-gold-light">Côte d&apos;Azur</span>
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            Trois adresses, un même goût pour la lumière du Sud et le partage.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {maisons.map((maison) => {
            const hasPhoto = maison.photoHero.length > 0;
            return (
              <article
                key={maison.slug}
                className="group flex flex-col bg-white border border-brand-ink/8 hover:border-brand-olive transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(31,34,24,0.25)]"
              >
                <Link
                  href={`/maisons/${maison.slug}`}
                  className="relative block h-[260px] overflow-hidden"
                  aria-label={`Découvrir Maison Oléa ${maison.nom}`}
                >
                  {hasPhoto ? (
                    <>
                      <Image
                        src={maison.photoHero}
                        alt={`Maison Oléa ${maison.nom}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(31,34,24,0.05) 0%, rgba(31,34,24,0.80) 100%)",
                        }}
                      />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          linear-gradient(to bottom, rgba(31,34,24,0.1) 0%, rgba(31,34,24,0.8) 100%),
                          radial-gradient(ellipse at 50% 40%, ${maison.accent} 0%, rgba(31,34,24,0.4) 70%, #1F2218 100%)
                        `,
                      }}
                      aria-hidden
                    />
                  )}
                  <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                    {maison.badgeOuverture && (
                      <span className="bg-brand-gold text-brand-ink text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 font-semibold">
                        {maison.badgeOuverture}
                      </span>
                    )}
                    <MaisonStatusPill maison={maison} variant="dark" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-2">
                      {maison.label}
                    </p>
                    <h2 className="font-serif text-3xl text-brand-cream leading-tight">
                      {maison.nom}
                    </h2>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <p className="inline-flex items-center gap-1.5 text-xs text-brand-text-muted mb-4">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {maison.adresse}, {maison.codePostal}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-ink/80 mb-5 flex-1">
                    {maison.description}
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-brand-ink/10">
                    {maison.ouvert ? (
                      <a
                        href={`tel:${maison.telephone}`}
                        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-brand-olive hover:text-brand-olive-deep transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" aria-hidden />
                        Réserver
                      </a>
                    ) : (
                      <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold-deep">
                        Bientôt
                      </span>
                    )}
                    <Link
                      href={`/maisons/${maison.slug}`}
                      className="text-[11px] uppercase tracking-[0.2em] text-brand-ink hover:text-brand-olive transition-colors"
                    >
                      Découvrir →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
