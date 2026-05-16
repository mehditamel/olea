import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { maisons } from "@/data/maisons";
import { googleMapsUrl } from "@/lib/maps";
import { Reveal } from "@/components/ui/Reveal";
import { MaisonStatusPill } from "@/components/maison/MaisonStatusPill";
import type { Maison } from "@/types/maison";

function maisonGradientStyle(accent: string): React.CSSProperties {
  return {
    background: `
      linear-gradient(to bottom, rgba(31,34,24,0.1) 0%, rgba(31,34,24,0.85) 100%),
      radial-gradient(ellipse at 50% 40%, ${accent} 0%, rgba(31,34,24,0.4) 70%, #1F2218 100%)
    `,
  };
}

const PHOTO_OVERLAY: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(31,34,24,0.05) 0%, rgba(31,34,24,0.85) 100%)",
};

function MaisonCard({ maison, delay }: { maison: Maison; delay: number }) {
  const featured = Boolean(maison.badgeOuverture);
  const hasPhoto = maison.photoHero.length > 0;
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`group relative bg-brand-ink-soft flex flex-col transition-transform duration-300 hover:-translate-y-1 ${featured ? "ring-1 ring-brand-gold" : ""}`}
    >
      <Link
        href={`/maisons/${maison.slug}`}
        className="relative block h-[280px] md:h-[320px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
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
            <div className="absolute inset-0" style={PHOTO_OVERLAY} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={maisonGradientStyle(maison.accent)}
            role="presentation"
          />
        )}
        <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
          {featured && (
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
          <h3 className="font-serif font-normal text-[30px] md:text-[34px] leading-[1.05] tracking-[-0.3px] text-brand-cream">
            {maison.nom}
          </h3>
        </div>
      </Link>

      <div className="px-6 py-6 md:py-7 flex flex-col flex-1">
        <p className="text-sm leading-relaxed text-brand-cream/90 mb-5 flex-1">
          {maison.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <a
            href={googleMapsUrl(maison)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-text-soft hover:text-brand-gold transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {maison.adresse}, {maison.codePostal}
          </a>
        </div>

        <div className="flex items-center justify-between gap-3 pt-5 border-t border-brand-cream/10">
          {maison.ouvert ? (
            <a
              href={`tel:${maison.telephone}`}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold hover:text-brand-gold-light active:opacity-80 transition-[color,opacity]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              Réserver
            </a>
          ) : (
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-text-soft">
              Bientôt
            </span>
          )}
          <Link
            href={`/maisons/${maison.slug}`}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-brand-cream/85 hover:text-brand-gold transition-colors"
          >
            Découvrir
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function MaisonsGrid() {
  return (
    <section
      id="maisons"
      className="bg-brand-ink text-brand-cream px-6 md:px-12 py-20 md:py-28"
    >
      <Reveal as="header" className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <p className="eyebrow text-brand-gold mb-5">Nos trois maisons</p>
        <h2 className="font-serif font-normal text-[clamp(34px,4.5vw,52px)] leading-[1.1] tracking-[-0.5px]">
          De la Provence à la{" "}
          <span className="italic text-brand-gold-light">Côte d&apos;Azur</span>
        </h2>
      </Reveal>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5">
        {maisons.map((maison, idx) => (
          <MaisonCard key={maison.slug} maison={maison} delay={idx * 120} />
        ))}
      </div>
    </section>
  );
}
