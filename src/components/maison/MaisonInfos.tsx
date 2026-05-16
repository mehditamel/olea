import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { MaisonStatusPill } from "./MaisonStatusPill";
import { JOUR_LABEL } from "@/lib/horaires";
import { googleMapsUrl } from "@/lib/maps";
import type { Maison, Horaire, Jour } from "@/types/maison";

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
}: {
  horaire?: Horaire;
  ferme: boolean;
  jour: Jour;
}) {
  return (
    <tr className="border-b border-brand-ink/10 last:border-0">
      <th
        scope="row"
        className="py-2.5 pr-6 text-left font-sans font-normal text-[13px] text-brand-ink/80"
      >
        {JOUR_LABEL[jour]}
      </th>
      {ferme ? (
        <td colSpan={2} className="py-2.5 text-[13px] italic text-brand-text-muted">
          Fermé
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

export function MaisonInfos({ maison }: { maison: Maison }) {
  const hasHoraires = maison.horaires.length > 0;
  const horairesByJour = new Map(maison.horaires.map((h) => [h.jour, h]));
  const fermesSet = new Set(maison.fermetureHebdo);

  return (
    <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <p className="eyebrow text-brand-olive">Nous trouver</p>
            <MaisonStatusPill maison={maison} variant="light" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-brand-ink">
            {maison.label}
          </h2>
          <address className="not-italic text-brand-ink text-[15px] leading-[1.85] mb-6">
            {maison.adresse}
            <br />
            {maison.codePostal} {maison.ville}
          </address>
          <a
            href={googleMapsUrl(maison)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors mb-8"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Itinéraire
          </a>
          {maison.ouvert ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-text-muted mb-2">
                Téléphone
              </p>
              <a
                href={`tel:${maison.telephone}`}
                className="inline-block font-serif text-2xl md:text-[28px] text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
              >
                {maison.telephoneAffichage}
              </a>
            </div>
          ) : (
            <p className="font-serif italic text-xl text-brand-olive">
              Ouverture prochaine
            </p>
          )}
          {maison.instagram?.url ? (
            <a
              href={maison.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors"
              aria-label={`Instagram @${maison.instagram.handle}`}
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @{maison.instagram.handle}
            </a>
          ) : maison.instagram ? (
            <p className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold-deep">
              <InstagramIcon className="h-3.5 w-3.5" />
              @{maison.instagram.handle} · bientôt
            </p>
          ) : null}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-gold-deep">
            {maison.cuisines.join(" · ")} · {maison.fourchettePrix}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-brand-olive mb-5">Horaires</p>
          {hasHoraires ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-ink/15">
                  <th className="sr-only">Jour</th>
                  <th className="py-2 pr-6 text-left text-[10px] uppercase tracking-[0.18em] text-brand-text-muted font-medium">
                    Déjeuner
                  </th>
                  <th className="py-2 text-left text-[10px] uppercase tracking-[0.18em] text-brand-text-muted font-medium">
                    Dîner
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
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-serif italic text-lg text-brand-text-muted">
              Horaires communiqués à l&apos;ouverture.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
