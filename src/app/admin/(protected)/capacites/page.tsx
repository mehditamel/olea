import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  CapacitesHebdoSection,
  type CapaciteRow,
} from "@/components/admin/CapacitesHebdoSection";
import {
  OverridesSection,
  type OverrideRow,
} from "@/components/admin/OverridesSection";
import {
  BlocagesSection,
  type BlocageRow,
} from "@/components/admin/BlocagesSection";
import {
  upsertCapaciteAction,
  upsertOverrideAction,
  deleteOverrideAction,
  addBlocageAction,
  deleteBlocageAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function CapacitesPage() {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);
  const [capRes, ovRes, blRes] = await Promise.all([
    supabase.from("capacites").select("*"),
    supabase
      .from("capacites_overrides")
      .select("*")
      .gte("date", today)
      .order("date", { ascending: true })
      .limit(100),
    supabase
      .from("creneaux_bloques")
      .select("*")
      .gte("date", today)
      .order("date", { ascending: true })
      .limit(100),
  ]);

  const capacites: CapaciteRow[] = (capRes.data ?? []) as CapaciteRow[];
  const overrides: OverrideRow[] = (ovRes.data ?? []) as OverrideRow[];
  const blocages: BlocageRow[] = (blRes.data ?? []) as BlocageRow[];

  return (
    <div className="space-y-12">
      <div>
        <p className="eyebrow text-brand-olive mb-2">Capacités & blocages</p>
        <h1 className="font-sans text-3xl text-brand-ink">
          Couverts par service
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Configurez la capacité par défaut (par jour de semaine), des
          exceptions ponctuelles, ou bloquez des créneaux entiers.
        </p>
      </div>

      <CapacitesHebdoSection
        capacites={capacites}
        action={upsertCapaciteAction}
      />

      <OverridesSection
        overrides={overrides}
        upsertAction={upsertOverrideAction}
        deleteAction={deleteOverrideAction}
      />

      <BlocagesSection
        blocages={blocages}
        addAction={addBlocageAction}
        deleteAction={deleteBlocageAction}
      />
    </div>
  );
}
