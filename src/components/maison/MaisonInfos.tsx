import type { Maison, Horaire, Jour } from "@/types/maison";

const JOUR_LABEL: Record<Jour, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};

function formatRange(range: string | null): string {
  if (!range) return "—";
  return range.replace("-", " – ");
}

function HoraireRow({ horaire }: { horaire: Horaire }) {
  return (
    <tr className="border-b border-brand-ink/10 last:border-0">
      <th
        scope="row"
        className="py-2.5 pr-6 text-left font-sans font-normal text-[13px] text-brand-ink/80"
      >
        {JOUR_LABEL[horaire.jour]}
      </th>
      <td className="py-2.5 text-[13px] text-brand-text-muted">
        {formatRange(horaire.dejeuner)}
      </td>
      <td className="py-2.5 text-[13px] text-brand-text-muted">
        {formatRange(horaire.diner)}
      </td>
    </tr>
  );
}

export function MaisonInfos({ maison }: { maison: Maison }) {
  const hasHoraires = maison.horaires.length > 0;
  const fermesLabels = maison.fermetureHebdo.map((j) => JOUR_LABEL[j]);

  return (
    <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <p className="eyebrow text-brand-olive mb-5">Nous trouver</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-brand-ink">
            {maison.label}
          </h2>
          <address className="not-italic text-brand-ink text-[15px] leading-[1.85] mb-8">
            {maison.adresse}
            <br />
            {maison.codePostal} {maison.ville}
          </address>
          {maison.ouvert ? (
            <a
              href={`tel:${maison.telephone}`}
              className="inline-block font-serif text-2xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
            >
              {maison.telephoneAffichage}
            </a>
          ) : (
            <p className="font-serif italic text-xl text-brand-olive">
              Ouverture prochaine
            </p>
          )}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-gold-deep">
            {maison.cuisines.join(" · ")}
          </p>
        </div>

        <div>
          <p className="eyebrow text-brand-olive mb-5">Horaires</p>
          {hasHoraires ? (
            <table className="w-full">
              <thead className="sr-only">
                <tr>
                  <th>Jour</th>
                  <th>Déjeuner</th>
                  <th>Dîner</th>
                </tr>
              </thead>
              <tbody>
                {maison.horaires.map((h) => (
                  <HoraireRow key={h.jour} horaire={h} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-serif italic text-lg text-brand-text-muted">
              Horaires communiqués à l&apos;ouverture.
            </p>
          )}
          {fermesLabels.length > 0 && (
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-brand-gold-deep">
              Fermé : {fermesLabels.join(", ")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
