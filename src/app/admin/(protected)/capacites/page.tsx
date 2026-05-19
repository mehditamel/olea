import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { maisons } from "@/data/maisons";
import { CapaciteInput } from "@/components/admin/CapaciteInput";
import { InlineFormButton } from "@/components/admin/InlineFormButton";
import { ActionForm } from "@/components/admin/ActionForm";
import {
  upsertCapaciteAction,
  upsertOverrideAction,
  deleteOverrideAction,
  addBlocageAction,
  deleteBlocageAction,
} from "./actions";
export const dynamic = "force-dynamic";

const JOURS = [
  { key: "lundi", label: "Lun" },
  { key: "mardi", label: "Mar" },
  { key: "mercredi", label: "Mer" },
  { key: "jeudi", label: "Jeu" },
  { key: "vendredi", label: "Ven" },
  { key: "samedi", label: "Sam" },
  { key: "dimanche", label: "Dim" },
] as const;

type CapaciteRow = {
  maison_slug: string;
  service: "dejeuner" | "diner";
  jour: string;
  couverts_max: number;
};
type OverrideRow = {
  maison_slug: string;
  date: string;
  service: "dejeuner" | "diner";
  couverts_max: number;
  raison: string | null;
};
type BlocageRow = {
  id: string;
  maison_slug: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  raison: string | null;
};

export default async function CapacitesPage() {
  const supabase = getSupabaseAdmin();
  const [capRes, ovRes, blRes] = await Promise.all([
    supabase.from("capacites").select("*"),
    supabase
      .from("capacites_overrides")
      .select("*")
      .gte("date", new Date().toISOString().slice(0, 10))
      .order("date", { ascending: true })
      .limit(100),
    supabase
      .from("creneaux_bloques")
      .select("*")
      .gte("date", new Date().toISOString().slice(0, 10))
      .order("date", { ascending: true })
      .limit(100),
  ]);

  const capacites: CapaciteRow[] = (capRes.data ?? []) as CapaciteRow[];
  const overrides: OverrideRow[] = (ovRes.data ?? []) as OverrideRow[];
  const blocages: BlocageRow[] = (blRes.data ?? []) as BlocageRow[];

  function findCapacite(
    maison: string,
    service: "dejeuner" | "diner",
    jour: string,
  ): number | null {
    const row = capacites.find(
      (c) => c.maison_slug === maison && c.service === service && c.jour === jour,
    );
    return row ? row.couverts_max : null;
  }

  return (
    <div className="space-y-12">
      <div>
        <p className="eyebrow text-brand-olive mb-2">Capacités & blocages</p>
        <h1 className="font-serif text-3xl text-brand-ink">
          Couverts par service
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Configurez la capacité par défaut (par jour de semaine), des
          exceptions ponctuelles, ou bloquez des créneaux entiers.
        </p>
      </div>

      <section className="space-y-5">
        <h2 className="font-serif text-xl text-brand-ink">
          Capacités hebdomadaires
        </h2>
        <p className="text-xs text-brand-text-muted">
          Modification automatique à la sortie du champ. Une cellule vide
          (non configurée) = capacité illimitée.
        </p>
        {maisons.map((m) => (
          <div
            key={m.slug}
            className="bg-white border border-brand-ink/10 p-5"
          >
            <h3 className="font-serif text-lg text-brand-ink mb-4">
              {m.nom}
            </h3>
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
                          action={upsertCapaciteAction}
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

      <section className="space-y-5">
        <h2 className="font-serif text-xl text-brand-ink">
          Exceptions par date
        </h2>
        <p className="text-xs text-brand-text-muted">
          Override ponctuel : remplace la capacité du jour pour une date donnée.
        </p>

        <ActionForm
          action={upsertOverrideAction}
          className="bg-brand-cream-soft border border-brand-ink/10 p-4 grid grid-cols-2 md:grid-cols-6 gap-3 items-end"
        >
          <Field label="Maison">
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
          </Field>
          <Field label="Date">
            <input
              type="date"
              name="date"
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
          <Field label="Service">
            <select
              name="service"
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            >
              <option value="dejeuner">Déjeuner</option>
              <option value="diner">Dîner</option>
            </select>
          </Field>
          <Field label="Couverts">
            <input
              type="number"
              name="couverts_max"
              min={0}
              max={500}
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
          <Field label="Raison (optionnelle)">
            <input
              type="text"
              name="raison"
              maxLength={200}
              placeholder="Privatisation, événement…"
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
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
                  <Th>Date</Th>
                  <Th>Maison</Th>
                  <Th>Service</Th>
                  <Th>Couverts</Th>
                  <Th>Raison</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody>
                {overrides.map((o) => (
                  <tr
                    key={`${o.maison_slug}-${o.date}-${o.service}`}
                    className="border-b border-brand-ink/5"
                  >
                    <Td>{o.date}</Td>
                    <Td>{o.maison_slug}</Td>
                    <Td>{o.service === "dejeuner" ? "Déjeuner" : "Dîner"}</Td>
                    <Td>{o.couverts_max}</Td>
                    <Td>{o.raison ?? "—"}</Td>
                    <Td>
                      <InlineFormButton
                        label="Supprimer"
                        variant="danger"
                        action={deleteOverrideAction}
                        hidden={{
                          maison_slug: o.maison_slug,
                          date: o.date,
                          service: o.service,
                        }}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl text-brand-ink">
          Créneaux bloqués
        </h2>
        <p className="text-xs text-brand-text-muted">
          Empêche les réservations sur un intervalle horaire précis (privatisation, fermeture exceptionnelle).
        </p>

        <ActionForm
          action={addBlocageAction}
          className="bg-brand-cream-soft border border-brand-ink/10 p-4 grid grid-cols-2 md:grid-cols-6 gap-3 items-end"
        >
          <Field label="Maison">
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
          </Field>
          <Field label="Date">
            <input
              type="date"
              name="date"
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
          <Field label="Début">
            <input
              type="time"
              name="heure_debut"
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
          <Field label="Fin">
            <input
              type="time"
              name="heure_fin"
              required
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
          <Field label="Raison (optionnelle)">
            <input
              type="text"
              name="raison"
              maxLength={200}
              className="border border-brand-ink/20 bg-white px-2 py-1.5 text-sm w-full"
            />
          </Field>
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
                  <Th>Date</Th>
                  <Th>Maison</Th>
                  <Th>Plage</Th>
                  <Th>Raison</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody>
                {blocages.map((b) => (
                  <tr key={b.id} className="border-b border-brand-ink/5">
                    <Td>{b.date}</Td>
                    <Td>{b.maison_slug}</Td>
                    <Td>
                      {b.heure_debut.slice(0, 5)} – {b.heure_fin.slice(0, 5)}
                    </Td>
                    <Td>{b.raison ?? "—"}</Td>
                    <Td>
                      <InlineFormButton
                        label="Supprimer"
                        variant="danger"
                        action={deleteBlocageAction}
                        hidden={{ id: b.id }}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.15em] text-brand-text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top text-brand-ink">{children}</td>;
}
