// eslint-disable-next-line no-restricted-imports -- admin space is locale-free
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { maisons } from "@/data/maisons";
import { todayIsoParis } from "@/lib/date-paris";
import type { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

const STATUT_LABELS: Record<string, { label: string; cls: string }> = {
  pending_card: {
    label: "CB attendue",
    cls: "bg-amber-100 text-amber-900 border-amber-200",
  },
  confirmed: {
    label: "Confirmée",
    cls: "bg-emerald-100 text-emerald-900 border-emerald-200",
  },
  cancelled_by_client: {
    label: "Annulée (client)",
    cls: "bg-stone-200 text-stone-700 border-stone-300",
  },
  cancelled_by_staff: {
    label: "Annulée (équipe)",
    cls: "bg-stone-200 text-stone-700 border-stone-300",
  },
  noshow: {
    label: "No-show",
    cls: "bg-red-100 text-red-900 border-red-200",
  },
  honored: {
    label: "Honorée",
    cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  expired: {
    label: "Expirée",
    cls: "bg-stone-200 text-stone-700 border-stone-300",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type ReservationRow =
  Database["public"]["Tables"]["reservations"]["Row"];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const filterMaison =
    typeof sp.maison === "string" && sp.maison !== "" ? sp.maison : null;
  const filterDate =
    typeof sp.date === "string" && sp.date !== "" ? sp.date : null;

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: true })
    .order("heure", { ascending: true })
    .limit(200);

  if (filterDate) {
    query = query.eq("date", filterDate);
  } else {
    query = query.gte("date", todayIsoParis());
  }
  if (filterMaison) {
    query = query.eq("maison_slug", filterMaison);
  }

  const { data, error } = await query;
  const rows = (data ?? []) as ReservationRow[];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow text-brand-olive mb-2">Tableau de bord</p>
          <h1 className="font-serif text-3xl text-brand-ink">
            Réservations à venir
          </h1>
        </div>
        <form className="flex flex-wrap items-end gap-3 text-sm" method="get">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
              Maison
            </span>
            <select
              name="maison"
              defaultValue={filterMaison ?? ""}
              className="border border-brand-ink/20 bg-white px-3 py-2 text-sm"
            >
              <option value="">Toutes</option>
              {maisons.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.nom}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
              Date
            </span>
            <input
              type="date"
              name="date"
              defaultValue={filterDate ?? ""}
              className="border border-brand-ink/20 bg-white px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="bg-brand-ink text-brand-cream px-5 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            Filtrer
          </button>
        </form>
      </div>

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-900 px-4 py-3 text-sm mb-6" role="alert">
          Erreur de chargement : {error.message}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="bg-white border border-brand-ink/10 px-6 py-12 text-center text-brand-text-muted text-sm">
          Aucune réservation pour ces critères.
        </p>
      ) : (
        <ReservationsTable rows={rows} />
      )}
    </div>
  );
}

function ReservationsTable({ rows }: { rows: ReservationRow[] }) {
  return (
    <div className="bg-white border border-brand-ink/10 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-brand-cream-soft border-b border-brand-ink/10">
          <tr className="text-left text-[11px] uppercase tracking-[0.15em] text-brand-text-muted">
            <Th>Maison</Th>
            <Th>Date</Th>
            <Th>Heure</Th>
            <Th>Couverts</Th>
            <Th>Client</Th>
            <Th>Contact</Th>
            <Th>Statut</Th>
            <Th>Garantie</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <ReservationRowView key={r.id} r={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReservationRowView({ r }: { r: ReservationRow }) {
  const statut = STATUT_LABELS[r.statut] ?? {
    label: r.statut,
    cls: "bg-stone-100 text-stone-700 border-stone-200",
  };
  const heure = r.heure.slice(0, 5);
  return (
    <tr className="border-b border-brand-ink/5 hover:bg-brand-cream-soft/50">
      <Td>{r.maison_slug}</Td>
      <Td>{r.date}</Td>
      <Td>
        {heure} <span className="text-xs text-brand-text-muted">({r.service})</span>
      </Td>
      <Td>{r.convives}</Td>
      <Td>
        <Link
          href={`/admin/reservations/${r.id}`}
          className="font-medium text-brand-ink hover:text-brand-olive hover:underline"
        >
          {r.nom}
        </Link>
        {r.occasion !== "aucune" && (
          <div className="text-xs text-brand-text-muted">{r.occasion}</div>
        )}
      </Td>
      <Td>
        <div className="text-xs">
          <a href={`mailto:${r.email}`} className="text-brand-olive hover:underline">{r.email}</a>
        </div>
        <div className="text-xs">
          <a href={`tel:${r.telephone}`} className="text-brand-olive hover:underline">{r.telephone}</a>
        </div>
      </Td>
      <Td>
        <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider border ${statut.cls}`}>
          {statut.label}
        </span>
      </Td>
      <Td>
        {r.requiert_garantie && r.montant_garantie_cents
          ? `${(r.montant_garantie_cents / 100).toFixed(0)} €`
          : "—"}
      </Td>
    </tr>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top text-brand-ink">{children}</td>;
}
