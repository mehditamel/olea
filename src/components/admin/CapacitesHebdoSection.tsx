import { maisons } from "@/data/maisons";
import { CapaciteInput } from "./CapaciteInput";

type AdminAction = (
  formData: FormData,
) => Promise<{ ok: boolean; error?: string }>;

export type CapaciteRow = {
  maison_slug: string;
  service: "dejeuner" | "diner";
  jour: string;
  couverts_max: number;
};

const JOURS = [
  { key: "lundi", label: "Lun" },
  { key: "mardi", label: "Mar" },
  { key: "mercredi", label: "Mer" },
  { key: "jeudi", label: "Jeu" },
  { key: "vendredi", label: "Ven" },
  { key: "samedi", label: "Sam" },
  { key: "dimanche", label: "Dim" },
] as const;

type CapacitesHebdoSectionProps = {
  capacites: CapaciteRow[];
  action: AdminAction;
};

/** Grille de capacité par défaut (couverts max par maison / service / jour). */
export function CapacitesHebdoSection({
  capacites,
  action,
}: CapacitesHebdoSectionProps) {
  const findCapacite = (
    maison: string,
    service: "dejeuner" | "diner",
    jour: string,
  ): number | null => {
    const row = capacites.find(
      (c) =>
        c.maison_slug === maison && c.service === service && c.jour === jour,
    );
    return row ? row.couverts_max : null;
  };

  return (
    <section className="space-y-5">
      <h2 className="font-serif text-xl text-brand-ink">
        Capacités hebdomadaires
      </h2>
      <p className="text-xs text-brand-text-muted">
        Modification automatique à la sortie du champ. Une cellule vide (non
        configurée) = capacité illimitée.
      </p>
      {maisons.map((m) => (
        <div key={m.slug} className="bg-white border border-brand-ink/10 p-5">
          <h3 className="font-serif text-lg text-brand-ink mb-4">{m.nom}</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
                <th className="py-2 pr-3 font-medium">Service</th>
                {JOURS.map((j) => (
                  <th key={j.key} className="py-2 px-2 font-medium">
                    {j.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["dejeuner", "diner"] as const).map((service) => (
                <tr key={service} className="border-t border-brand-ink/5">
                  <td className="py-2 pr-3 text-brand-ink font-medium">
                    {service === "dejeuner" ? "Déjeuner" : "Dîner"}
                  </td>
                  {JOURS.map((j) => (
                    <td key={j.key} className="py-2 px-2">
                      <CapaciteInput
                        maisonSlug={m.slug}
                        service={service}
                        jour={j.key}
                        initial={findCapacite(m.slug, service, j.key)}
                        action={action}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}
