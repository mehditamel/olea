import { Phone, ExternalLink } from "lucide-react";
import type { Maison } from "@/types/maison";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { interpolate } from "@/i18n/format";

export function MaisonReservation({
  maison,
  lang,
  dict,
}: {
  maison: Maison;
  lang: Locale;
  dict: Dictionary;
}) {
  if (!maison.ouvert) {
    return (
      <section className="bg-brand-cream px-6 md:px-12 pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl border-t border-brand-ink/15 pt-14 md:pt-16 text-center">
          <p className="eyebrow text-brand-olive mb-4">
            {dict.maisonReservation.fermeeEyebrow}
          </p>
          <p className="font-serif italic text-2xl md:text-3xl text-brand-ink mb-7">
            {dict.maisonReservation.fermeeTitre}
          </p>
          <a
            href={withLocale(lang, "/contact")}
            className="inline-block bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            {dict.maisonReservation.fermeeCta}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-cream px-6 md:px-12 pb-16 md:pb-20">
      <div className="mx-auto max-w-3xl border-t border-brand-ink/15 pt-14 md:pt-16 text-center">
        <p className="eyebrow text-brand-olive mb-4">
          {interpolate(dict.maisonReservation.ouverteEyebrow, {
            nom: maison.nom,
          })}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl mb-3 text-brand-ink">
          {dict.maisonReservation.ouverteTitre}
        </h2>
        <p className="font-serif italic text-lg text-brand-text-muted mb-8 max-w-md mx-auto">
          {dict.maisonReservation.ouverteItalic}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          {maison.reservationUrl ? (
            <a
              href={maison.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              {dict.maisonReservation.ouverteCta}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            <a
              href={withLocale(lang, `/reserver?maison=${maison.slug}`)}
              className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              {dict.maisonReservation.ouverteCta}
            </a>
          )}
          <a
            href={`tel:${maison.telephone}`}
            className="inline-flex items-center justify-center gap-2 border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {maison.telephoneAffichage}
          </a>
        </div>
      </div>
    </section>
  );
}
