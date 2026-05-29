"use client";

import { OliveBranch } from "@/components/brand/OliveBranch";
import { EngravingMotif } from "@/components/brand/EngravingMotif";
import { useI18n } from "@/i18n/LocaleProvider";
import { LocaleLink } from "@/i18n/LocaleLink";

export default function NotFound() {
  const { dict } = useI18n();
  return (
    <section className="relative bg-brand-ink text-brand-cream min-h-[100svh] flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      <OliveBranch
        className="absolute -end-10 -bottom-10 w-72 h-80 md:w-96 md:h-[28rem] text-brand-olive-soft opacity-20 pointer-events-none"
        color="currentColor"
      />
      {/* Soleil gravé — lumière du Sud (charte) */}
      <EngravingMotif
        motif="sun"
        className="pointer-events-none absolute -start-6 top-20 h-36 w-40 text-brand-olive-soft opacity-[0.12] md:h-48 md:w-56"
      />
      <div className="relative mx-auto max-w-3xl">
        <p className="eyebrow text-brand-gold mb-5">{dict.notFound.eyebrow}</p>
        <h1 className="font-sans font-medium text-[clamp(44px,7vw,80px)] leading-[1.02] tracking-[-1px] mb-6">
          {dict.notFound.titre}{" "}
          <span className="font-serif italic text-brand-gold-light">
            {dict.notFound.titreItalic}
          </span>
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-brand-cream/85 max-w-xl mb-10">
          {dict.notFound.sousTitre}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <LocaleLink
            href="/"
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-gold transition-colors"
          >
            {dict.notFound.ctaAccueil}
          </LocaleLink>
          <LocaleLink
            href="/maisons"
            className="inline-flex items-center justify-center border border-brand-cream/70 text-brand-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            {dict.notFound.ctaMaisons}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
