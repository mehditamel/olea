import { maisons } from "@/data/maisons";
import { ActionForm } from "./ActionForm";
import { InlineFormButton } from "./InlineFormButton";
import { AdminField } from "./AdminField";

type AdminAction = (
  formData: FormData,
) => Promise<{ ok: boolean; error?: string }>;

export type OverrideRow = {
  maison_slug: string;
  date: string;
  service: "dejeuner" | "diner";
  couverts_max: number;
  raison: string | null;
};

const TH = "px-4 py-3 font-medium";
const TD = "px-4 py-3 align-top text-brand-ink";

type OverridesSectionProps = {
  overrides: OverrideRow[];
  upsertAction: AdminAction;
  deleteAction: AdminAction;
};

/** Exceptions ponctuelles de capacité pour une date donnée. */
export function OverridesSection({
  overrides,
  upsertAction,
  deleteAction,
}: OverridesSectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-serif text-xl text-brand-ink">Exceptions par date</h2>
      <p className="text-xs text-brand-text-muted">
        Override ponctuel : remplace la capacité du jour pour une date donnée.
      </p>

      <ActionForm
        action={upsertAction}
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
        <AdminField label="Service">
          <select
            name="service"
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          >
            <option value="dejeuner">Déjeuner</option>
            <option value="diner">Dîner</option>
          </select>
        </AdminField>
        <AdminField label="Couverts">
          <input
            type="number"
            name="couverts_max"
            min={0}
            max={500}
            required
            className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
          />
        </AdminField>
        <AdminField label="Raison (optionnelle)">
          <input
            type="text"
            name="raison"
            maxLength={200}
            placeholder="Privatisation, événement…"
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

      {overrides.length === 0 ? (
        <p className="text-sm text-brand-text-muted italic">
          Aucune exception programmée.
        </p>
      ) : (
        <div className="bg-white border border-brand-ink/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream-soft border-b border-brand-ink/10 text-left text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
              <tr>
                <th className={TH}>Date</th>
                <th className={TH}>Maison</th>
                <th className={TH}>Service</th>
                <th className={TH}>Couverts</th>
                <th className={TH}>Raison</th>
                <th className={TH}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {overrides.map((o) => (
                <tr
                  key={`${o.maison_slug}-${o.date}-${o.service}`}
                  className="border-b border-brand-ink/5"
                >
                  <td className={TD}>{o.date}</td>
                  <td className={TD}>{o.maison_slug}</td>
                  <td className={TD}>
                    {o.service === "dejeuner" ? "Déjeuner" : "Dîner"}
                  </td>
                  <td className={TD}>{o.couverts_max}</td>
                  <td className={TD}>{o.raison ?? "—"}</td>
                  <td className={TD}>
                    <InlineFormButton
                      label="Supprimer"
                      variant="danger"
                      action={deleteAction}
                      hidden={{
                        maison_slug: o.maison_slug,
                        date: o.date,
                        service: o.service,
                      }}
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
