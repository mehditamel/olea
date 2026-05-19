import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { MaisonStatusPill } from "./MaisonStatusPill";
import { googleMapsUrl } from "@/lib/maps";
import type { Maison, Horaire, Jour } from "@/types/maison";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatJour, interpolate } from "@/i18n/format";
import { localizeMaison } from "@/i18n/localized-maison";

function formatRange(range: string | null): string {
  if (!range) return "—";
  return range.replace("-", " – ");
}

const ALL_JOURS: readonly Jour[] = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

function HoraireRow({
  horaire,
  ferme,
  jour,
  lang,
  dict,
}: {
  horaire?: Horaire;
  ferme: boolean;
  jour: Jour;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <tr className="border-b border-brand-ink/10 last:border-0">
      <th
        scope="row"
        className="py-2.5 pe-6 text-start font-sans font-normal text-[13px] text-brand-ink/80"
      >
        {formatJour(jour, lang)}
      </th>
      {ferme ? (
        <td
          colSpan={2}
          className="py-2.5 text-[13px] italic text-brand-text-muted"
        >
          {dict.maisonInfos.ferme}
        </td>
      ) : (
        <>
          <td className="py-2.5 text-[13px] text-brand-text-muted">
            {formatRange(horaire?.dejeuner ?? null)}
          </td>
          <td className="py-2.5 text-[13px] text-brand-text-muted">
            {formatRange(horaire?.diner ?? null)}
          </td>
        </>
      )}
    </tr>
  );
}

export function MaisonInfos({
  maison,
  lang,
  dict,
}: {
  maison: Maison;
  lang: Locale;
  dict: Dictionary;
}) {
  const m = localizeMaison(maison, lang);
  const hasHoraires = maison.horaires.length > 0;
  const horairesByJour = new Map(maison.horaires.map((h) => [h.jour, h]));
  const fermesSet = new Set(maison.fermetureHebdo);

  return (
    <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <p className="eyebrow text-brand-olive">
              {dict.maisonInfos.nousTrouver}
            </p>
            <MaisonStatusPill
              maison={maison}
              variant="light"
              lang={lang}
              dict={dict}
            />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-brand-ink">
            {m.label}
          </h2>
          <address className="not-italic text-brand-ink text-[15px] leading-[1.85] mb-6">
            <bdi>{m.adresse}</bdi>
            <br />
            <bdi>{m.codePostal} {m.ville}</bdi>
          </address>
          <a
            href={googleMapsUrl(m)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors mb-8"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {dict.maisonHero.itineraire}
          </a>
          {m.ouvert ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-text-muted mb-2">
                {dict.maisonInfos.telephone}
              </p>
              <a
                href={`tel:${m.telephone}`}
                className="inline-block font-serif text-2xl md:text-[28px] text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
              >
                <bdi dir="ltr">{m.telephoneAffichage}</bdi>
              </a>
            </div>
          ) : (
            <p className="font-serif italic text-xl text-brand-olive">
              {dict.contact.ouvertureProchaine}
            </p>
          )}
          {m.instagram?.url ? (
            <a
              href={m.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors"
              aria-label={interpolate(dict.maisonInfos.instagramAria, {
                handle: m.instagram.handle,
              })}
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @{m.instagram.handle}
            </a>
          ) : m.instagram ? (
            <p className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold-deep">
              <InstagramIcon className="h-3.5 w-3.5" />
              @{m.instagram.handle} · {dict.contact.bientot}
            </p>
          ) : null}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-gold-deep">
            {m.cuisines.join(" · ")} · {m.fourchettePrix}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-brand-olive mb-5">
            {dict.maisonInfos.horaires}
          </p>
          {hasHoraires ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-ink/15">
                  <th className="sr-only">{dict.maisonInfos.jour}</th>
                  <th className="py-2 pe-6 text-start text-[10px] uppercase tracking-[0.18em] text-brand-text-muted font-medium">
                    {dict.maisonInfos.dejeuner}
                  </th>
                  <th className="py-2 text-start text-[10px] uppercase tracking-[0.18em] text-brand-text-muted font-medium">
                    {dict.maisonInfos.diner}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ALL_JOURS.map((jour) => (
                  <HoraireRow
                    key={jour}
                    jour={jour}
                    horaire={horairesByJour.get(jour)}
                    ferme={fermesSet.has(jour)}
                    lang={lang}
                    dict={dict}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-serif italic text-lg text-brand-text-muted">
              {dict.maisonInfos.horairesAOuverture}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
