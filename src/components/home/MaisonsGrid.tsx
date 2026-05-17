import Image from "next/image";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { maisons } from "@/data/maisons";
import { googleMapsUrl } from "@/lib/maps";
import { Reveal } from "@/components/ui/Reveal";
import { MaisonStatusPill } from "@/components/maison/MaisonStatusPill";
import type { Maison } from "@/types/maison";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";
import { interpolate } from "@/i18n/format";

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

function MaisonCard({
  maison,
  delay,
  lang,
  dict,
}: {
  maison: Maison;
  delay: number;
  lang: Locale;
  dict: Dictionary;
}) {
  const m = localizeMaison(maison, lang);
  const featured = Boolean(m.badgeOuverture);
  const hasPhoto = m.photoHero.length > 0;
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`group relative bg-brand-ink-soft flex flex-col transition-transform duration-300 hover:-translate-y-1 ${featured ? "ring-1 ring-brand-gold" : ""}`}
    >
      <a
        href={withLocale(lang, `/maisons/${m.slug}`)}
        className="relative block h-[280px] md:h-[320px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
        aria-label={interpolate(dict.maisons.ariaDecouvrir, { nom: m.nom })}
      >
        {hasPhoto ? (
          <>
            <Image
              src={m.photoHero}
              alt={interpolate(dict.maisons.altMaison, { nom: m.nom })}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={PHOTO_OVERLAY} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={maisonGradientStyle(m.accent)}
            role="presentation"
          />
        )}
        <div className="absolute top-5 end-5 flex flex-col items-end gap-2">
          {featured && (
            <span className="bg-brand-gold text-brand-ink text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 font-semibold">
              {m.badgeOuverture}
            </span>
          )}
          <MaisonStatusPill
            maison={maison}
            variant="dark"
            lang={lang}
            dict={dict}
          />
        </div>
        <div className="absolute bottom-6 start-6 end-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-2">
            {m.label}
          </p>
          <h3 className="font-serif font-normal text-[30px] md:text-[34px] leading-[1.05] tracking-[-0.3px] text-brand-cream">
            {m.nom}
          </h3>
        </div>
      </a>

      <div className="px-6 py-6 md:py-7 flex flex-col flex-1">
        <p className="text-sm leading-relaxed text-brand-cream/90 mb-5 flex-1">
          {m.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <a
            href={googleMapsUrl(m)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-text-soft hover:text-brand-gold transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {m.adresse}, {m.codePostal}
          </a>
        </div>

        <div className="flex items-center justify-between gap-3 pt-5 border-t border-brand-cream/10">
          {m.ouvert ? (
            <a
              href={`tel:${m.telephone}`}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold hover:text-brand-gold-light active:opacity-80 transition-[color,opacity]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {dict.maisons.reserver}
            </a>
          ) : (
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-text-soft">
              {dict.maisons.bientot}
            </span>
          )}
          <a
            href={withLocale(lang, `/maisons/${m.slug}`)}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-brand-cream/85 hover:text-brand-gold transition-colors"
          >
            {dict.maisons.decouvrir}
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function MaisonsGrid({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="maisons"
      className="bg-brand-ink text-brand-cream px-6 md:px-12 py-20 md:py-28"
    >
      <Reveal
        as="header"
        className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
      >
        <p className="eyebrow text-brand-gold mb-5">{dict.maisons.eyebrow}</p>
        <h2 className="font-serif font-normal text-[clamp(34px,4.5vw,52px)] leading-[1.1] tracking-[-0.5px]">
          {dict.maisons.titre}{" "}
          <span className="italic text-brand-gold-light">
            {dict.maisons.titreItalic}
          </span>
        </h2>
      </Reveal>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5">
        {maisons.map((maison, idx) => (
          <MaisonCard
            key={maison.slug}
            maison={maison}
            delay={idx * 120}
            lang={lang}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
