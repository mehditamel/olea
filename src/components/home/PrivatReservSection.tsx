import { Phone } from "lucide-react";
import { maisons } from "@/data/maisons";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

export function PrivatReservSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="privatisation"
      className="bg-brand-cream px-6 md:px-12 pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-0 items-stretch pt-16 md:pt-20 border-t border-brand-ink/15">
        <Reveal className="md:pe-14">
          <p className="eyebrow text-brand-olive mb-5">
            {dict.privatReserv.eyebrowPrivat}
          </p>
          <h2 className="font-sans font-medium text-[clamp(32px,4vw,44px)] leading-[1.1] tracking-[-0.5px] mb-6 text-brand-ink">
            {dict.privatReserv.titrePrivat}{" "}
            <span className="font-serif italic">
              {dict.privatReserv.titrePrivatItalic}
            </span>
          </h2>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-8 max-w-[460px]">
            {dict.privatReserv.pPrivat}
          </p>
          <a
            href={withLocale(lang, "/privatisation")}
            className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            {dict.privatReserv.ctaPrivat}
          </a>
        </Reveal>

        <Reveal
          delay={120}
          id="reserver"
          className="bg-brand-ink text-brand-cream p-7 sm:p-9 md:p-11 scroll-mt-28"
        >
          <p className="eyebrow text-brand-gold mb-2">
            {dict.privatReserv.eyebrowReserver}
          </p>
          <p className="font-sans text-[22px] leading-snug mt-3 mb-6 max-w-[280px]">
            {dict.privatReserv.sousReserver}
          </p>
          <a
            href={withLocale(lang, "/reserver")}
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors"
          >
            {dict.privatReserv.ctaReserver}
          </a>

          <p className="eyebrow text-brand-gold mt-9 mb-4">
            {dict.privatReserv.eyebrowPhone}
          </p>
          <ul className="flex flex-col gap-4">
            {maisons.map((raw) => {
              const maison = localizeMaison(raw, lang);
              const inner = (
                <>
                  <div className="flex flex-col">
                    <span className="font-sans text-[22px] leading-tight">
                      {maison.nom}
                    </span>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-brand-text-soft mt-1">
                      {maison.label}
                    </span>
                  </div>
                  {maison.ouvert ? (
                    <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-brand-gold">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      <span className="hidden sm:inline">
                        <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                      </span>
                      <span className="sm:hidden">
                        {dict.privatReserv.appeler}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[11px] tracking-[0.18em] uppercase text-brand-gold">
                      {dict.common.bientot}
                    </span>
                  )}
                </>
              );

              return (
                <li
                  key={maison.slug}
                  className="border-b border-brand-cream/12 last:border-0 pb-4 last:pb-0"
                >
                  {maison.ouvert ? (
                    <a
                      href={`tel:${maison.telephone}`}
                      className="flex items-center justify-between gap-4 -mx-2 px-2 py-1.5 rounded hover:bg-brand-cream/5 transition-colors"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 px-2 py-1.5 opacity-80">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
