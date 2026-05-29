import { maisons } from "@/data/maisons";
import { ActionForm } from "./ActionForm";
import { InlineFormButton } from "./InlineFormButton";
import { AdminField } from "./AdminField";

type AdminAction = (
  formData: FormData,
) => Promise<{ ok: boolean; error?: string }>;

export type BlocageRow = {
  id: string;
  maison_slug: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  raison: string | null;
};

const TH = "px-4 py-3 font-medium";
const TD = "px-4 py-3 align-top text-brand-ink";

type BlocagesSectionProps = {
  blocages: BlocageRow[];
  addAction: AdminAction;
  deleteAction: AdminAction;
};

/** Blocage d'un intervalle horaire (privatisation, fermeture exceptionnelle). */
export function BlocagesSection({
  blocages,
  addAction,
  deleteAction,
}: BlocagesSectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-sans text-xl text-brand-ink">Créneaux bloqués</h2>
      <p className="text-xs text-brand-text-muted">
        Empêche les réservations sur un intervalle horaire précis
        (privatisation, fermeture exceptionnelle).
      </p>

      <ActionForm
        action={addAction}
        className="bg-brand-cream-soft border border-brand-ink/10 p-4 grid grid-cols-2 md:grid-cols-6 gap-3 items-end"
      >
        <AdminField label="Maison">
          <select
            name="maison_slug"
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          >
            {maisons.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.nom}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Date">
          <input
            type="date"
            name="date"
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          />
        </AdminField>
        <AdminField label="Début">
          <input
            type="time"
            name="heure_debut"
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          />
        </AdminField>
        <AdminField label="Fin">
          <input
            type="time"
            name="heure_fin"
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          />
        </AdminField>
        <AdminField label="Raison (optionnelle)">
          <input
            type="text"
            name="raison"
            maxLength={200}
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          />
        </AdminField>
        <button
          type="submit"
          className="bg-brand-ink text-brand-cream px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
        >
          Ajouter
        </button>
      </ActionForm>

      {blocages.length === 0 ? (
        <p className="text-sm text-brand-text-muted italic">
          Aucun créneau bloqué.
        </p>
      ) : (
        <div className="bg-white border border-brand-ink/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream-soft border-b border-brand-ink/10 text-left text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
              <tr>
                <th className={TH}>Date</th>
                <th className={TH}>Maison</th>
                <th className={TH}>Plage</th>
                <th className={TH}>Raison</th>
                <th className={TH}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {blocages.map((b) => (
                <tr key={b.id} className="border-b border-brand-ink/5">
                  <td className={TD}>{b.date}</td>
                  <td className={TD}>{b.maison_slug}</td>
                  <td className={TD}>
                    {b.heure_debut.slice(0, 5)} – {b.heure_fin.slice(0, 5)}
                  </td>
                  <td className={TD}>{b.raison ?? "—"}</td>
                  <td className={TD}>
                    <InlineFormButton
                      label="Supprimer"
                      variant="danger"
                      action={deleteAction}
                      hidden={{ id: b.id }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
