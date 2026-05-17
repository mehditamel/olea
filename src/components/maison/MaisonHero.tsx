import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { OliveBranch } from "@/components/brand/OliveBranch";
import { MaisonStatusPill } from "./MaisonStatusPill";
import { googleMapsUrl } from "@/lib/maps";
import type { Maison } from "@/types/maison";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeMaison } from "@/i18n/localized-maison";
import { interpolate } from "@/i18n/format";

export function MaisonHero({
  maison,
  lang,
  dict,
}: {
  maison: Maison;
  lang: Locale;
  dict: Dictionary;
}) {
  const m = localizeMaison(maison, lang);
  const featured = Boolean(m.badgeOuverture);
  const hasPhoto = m.photoHero.length > 0;
  return (
    <section
      className="relative min-h-[78vh] md:min-h-[560px] md:h-[72vh] overflow-hidden"
      aria-label={interpolate(dict.maisonHero.ariaSection, { nom: m.nom })}
    >
      {hasPhoto && (
        <Image
          src={m.photoHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: hasPhoto
            ? "linear-gradient(to bottom, rgba(31,34,24,0.20) 0%, rgba(31,34,24,0.80) 100%)"
            : `
              linear-gradient(to bottom, rgba(31,34,24,0.2) 0%, rgba(31,34,24,0.7) 100%),
              radial-gradient(ellipse at 50% 40%, ${m.accent} 0%, rgba(31,34,24,0.5) 60%, #1F2218 100%)
            `,
        }}
      />
      <OliveBranch className="absolute end-[4%] bottom-[8%] w-[140px] md:w-[220px] h-auto text-brand-cream opacity-20" />
      <div className="relative h-full mx-auto max-w-7xl flex flex-col justify-end px-6 pb-10 md:px-12 md:pb-16 text-brand-cream pt-28 md:pt-32">
        <div className="olea-fade-up flex items-center gap-3 mb-4">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold">
            {m.label}
          </p>
          <MaisonStatusPill
            maison={maison}
            variant="dark"
            lang={lang}
            dict={dict}
          />
        </div>
        <h1 className="olea-fade-up font-serif font-normal text-[clamp(40px,6.5vw,72px)] leading-[1.02] tracking-[-1px] mb-5">
          {m.nom}
        </h1>
        <p className="olea-fade-up font-serif italic text-lg md:text-xl max-w-[560px] opacity-90 leading-snug mb-7">
          {m.description}
        </p>

        <div className="olea-fade-up flex flex-wrap items-center gap-3">
          {m.ouvert ? (
            <a
              href={`tel:${m.telephone}`}
              className="inline-flex items-center gap-2 bg-brand-cream text-brand-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-gold active:scale-[0.98] transition-[background-color,transform]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {m.telephoneAffichage}
            </a>
          ) : null}
          <a
            href={googleMapsUrl(m)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-cream/70 text-brand-cream px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-cream hover:text-brand-ink active:scale-[0.98] transition-[background-color,color,transform]"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {dict.maisonHero.itineraire}
          </a>
          {featured && (
            <span className="bg-brand-gold text-brand-ink text-[11px] tracking-[0.2em] uppercase px-3 py-2 font-semibold">
              {m.badgeOuverture}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
