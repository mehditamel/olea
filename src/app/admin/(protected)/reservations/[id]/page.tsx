import { notFound } from "next/navigation";
// eslint-disable-next-line no-restricted-imports -- admin space is locale-free
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  findReservationById,
  type ReservationRow,
} from "@/lib/reservation/repository";
import { getMaisonBySlug } from "@/data/maisons";
import { StaffNotesForm } from "@/components/admin/StaffNotesForm";
import { ReservationDetailField } from "@/components/admin/ReservationDetailField";
import { ReservationStripeSection } from "@/components/admin/ReservationStripeSection";
import { ReservationActions } from "@/components/admin/ReservationActions";
import {
  cancelReservationAction,
  markHonoredAction,
  markNoShowAction,
  updateNotesAction,
} from "./actions";

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
  noshow: { label: "No-show", cls: "bg-red-100 text-red-900 border-red-200" },
  honored: {
    label: "Honorée",
    cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  expired: {
    label: "Expirée",
    cls: "bg-stone-200 text-stone-700 border-stone-300",
  },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function ReservationDetailPage({ params }: PageProps) {
  const { id } = await params;
  // RLS staff appliquée : pour le SELECT on passe par le client SSR.
  const supabase = await createSupabaseServerClient();
  const { data: row } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!row) {
    // Fallback admin (RLS pourrait bloquer si bug) — recharge via admin client.
    const adminRow = await findReservationById(id);
    if (!adminRow) notFound();
    return renderPage(adminRow);
  }
  return renderPage(row as ReservationRow);
}

function renderPage(r: ReservationRow) {
  const maison = getMaisonBySlug(r.maison_slug);
  const statut = STATUT_LABELS[r.statut] ?? {
    label: r.statut,
    cls: "bg-stone-100 text-stone-700",
  };
  const heure = r.heure.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.2em] text-brand-olive hover:underline"
          >
            ← Toutes les réservations
          </Link>
          <h1 className="font-serif text-3xl text-brand-ink mt-2">
            Réservation {r.nom}
          </h1>
          <p className="text-sm text-brand-text-muted">
            {maison?.nom ?? r.maison_slug} · {r.date} · {heure} · {r.convives}{" "}
            couverts
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 text-[11px] uppercase tracking-wider border ${statut.cls}`}
        >
          {statut.label}
        </span>
      </div>

      <section className="bg-white border border-brand-ink/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <ReservationDetailField
          label="Maison"
          value={maison?.nom ?? r.maison_slug}
        />
        <ReservationDetailField
          label="Service"
          value={r.service === "dejeuner" ? "Déjeuner" : "Dîner"}
        />
        <ReservationDetailField label="Date" value={r.date} />
        <ReservationDetailField label="Heure" value={heure} />
        <ReservationDetailField label="Convives" value={String(r.convives)} />
        <ReservationDetailField
          label="Occasion"
          value={r.occasion === "aucune" ? "—" : r.occasion}
        />
        <ReservationDetailField
          label="Email"
          value={
            <a
              href={`mailto:${r.email}`}
              className="text-brand-olive hover:underline"
            >
              {r.email}
            </a>
          }
        />
        <ReservationDetailField
          label="Téléphone"
          value={
            <a
              href={`tel:${r.telephone}`}
              className="text-brand-olive hover:underline"
            >
              {r.telephone}
            </a>
          }
        />
        {r.demandes && (
          <ReservationDetailField
            label="Demandes client"
            value={<span className="whitespace-pre-wrap">{r.demandes}</span>}
            full
          />
        )}
        <ReservationDetailField
          label="Créée le"
          value={new Date(r.created_at).toLocaleString("fr-FR")}
        />
        <ReservationDetailField label="Source" value={r.source} />
      </section>

      <ReservationStripeSection reservation={r} />

      <ReservationActions
        reservation={r}
        markHonoredAction={markHonoredAction}
        markNoShowAction={markNoShowAction}
        cancelReservationAction={cancelReservationAction}
      />

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-brand-ink">Notes équipe</h2>
        <p className="text-xs text-brand-text-muted">
          Visibles uniquement par l&apos;équipe. Pas envoyées au client.
        </p>
        <StaffNotesForm
          reservationId={r.id}
          initial={r.notes_staff ?? ""}
          action={updateNotesAction}
        />
      </section>
    </div>
  );
}
