"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/LocaleProvider";
import { LocaleLink } from "@/i18n/LocaleLink";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useI18n();
  useEffect(() => {
    console.error("Olea page error:", error);
  }, [error]);

  return (
    <section className="bg-brand-ink text-brand-cream min-h-[80svh] flex items-center px-6 md:px-12 pt-32 pb-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-brand-gold mb-5">{dict.errorPage.eyebrow}</p>
        <h1 className="font-sans font-medium text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.5px] mb-6">
          {dict.errorPage.titre}{" "}
          <span className="font-serif italic text-brand-gold-light">
            {dict.errorPage.titreItalic}
          </span>
        </h1>
        <p className="font-serif italic text-lg text-brand-cream/85 mb-8">
          {dict.errorPage.sousTitre}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-gold transition-colors"
          >
            {dict.errorPage.ctaRetry}
          </button>
          <LocaleLink
            href="/"
            className="inline-flex items-center justify-center border border-brand-cream/70 text-brand-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            {dict.errorPage.ctaAccueil}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
