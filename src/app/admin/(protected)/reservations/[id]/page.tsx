import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { findReservationById } from "@/lib/reservation/repository";
import { getMaisonBySlug } from "@/data/maisons";
import { ConfirmFormButton } from "@/components/admin/ConfirmFormButton";
import { StaffNotesForm } from "@/components/admin/StaffNotesForm";
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
  return renderPage(row as Row);
}

type Row = NonNullable<Awaited<ReturnType<typeof findReservationById>>>;

function renderPage(r: Row) {
  const maison = getMaisonBySlug(r.maison_slug);
  const statut = STATUT_LABELS[r.statut] ?? {
    label: r.statut,
    cls: "bg-stone-100 text-stone-700",
  };
  const heure = r.heure.slice(0, 5);
  const garantieEuros = r.montant_garantie_cents
    ? (r.montant_garantie_cents / 100).toFixed(0)
    : null;
  const stripeUrlPrefix =
    process.env.STRIPE_LIVEMODE === "true"
      ? "https://dashboard.stripe.com"
      : "https://dashboard.stripe.com/test";
  const isTerminal = [
    "cancelled_by_client",
    "cancelled_by_staff",
    "noshow",
    "honored",
    "expired",
  ].includes(r.statut);

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
        <Field label="Maison" value={maison?.nom ?? r.maison_slug} />
        <Field label="Service" value={r.service === "dejeuner" ? "Déjeuner" : "Dîner"} />
        <Field label="Date" value={r.date} />
        <Field label="Heure" value={heure} />
        <Field label="Convives" value={String(r.convives)} />
        <Field
          label="Occasion"
          value={r.occasion === "aucune" ? "—" : r.occasion}
        />
        <Field
          label="Email"
          value={
            <a href={`mailto:${r.email}`} className="text-brand-olive hover:underline">
              {r.email}
            </a>
          }
        />
        <Field
          label="Téléphone"
          value={
            <a href={`tel:${r.telephone}`} className="text-brand-olive hover:underline">
              {r.telephone}
            </a>
          }
        />
        {r.demandes && (
          <Field
            label="Demandes client"
            value={<span className="whitespace-pre-wrap">{r.demandes}</span>}
            full
          />
        )}
        <Field label="Créée le" value={new Date(r.created_at).toLocaleString("fr-FR")} />
        <Field label="Source" value={r.source} />
      </section>

      {(r.requiert_garantie || r.stripe_setup_intent_id) && (
        <section className="bg-brand-cream-soft border border-brand-olive/30 p-6 text-sm">
          <h2 className="font-serif text-xl text-brand-ink mb-3">
            Garantie Stripe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field
              label="Montant"
              value={garantieEuros ? `${garantieEuros} €` : "—"}
            />
            <Field
              label="SetupIntent"
              value={
                r.stripe_setup_intent_id ? (
                  <a
                    href={`${stripeUrlPrefix}/setup_intents/${r.stripe_setup_intent_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-olive hover:underline font-mono text-xs"
                  >
                    {r.stripe_setup_intent_id.slice(0, 20)}…
                  </a>
                ) : (
                  "—"
                )
              }
            />
            <Field
              label="Customer"
              value={
                r.stripe_customer_id ? (
                  <a
                    href={`${stripeUrlPrefix}/customers/${r.stripe_customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-olive hover:underline font-mono text-xs"
                  >
                    {r.stripe_customer_id}
                  </a>
                ) : (
                  "—"
                )
              }
            />
            <Field
              label="Payment Method"
              value={
                r.stripe_payment_method_id ? (
                  <span className="font-mono text-xs">{r.stripe_payment_method_id}</span>
                ) : (
                  "—"
                )
              }
            />
            {r.stripe_payment_intent_id && (
              <Field
                label="PaymentIntent (no-show)"
                value={
                  <a
                    href={`${stripeUrlPrefix}/payments/${r.stripe_payment_intent_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-olive hover:underline font-mono text-xs"
                  >
                    {r.stripe_payment_intent_id}
                  </a>
                }
              />
            )}
          </div>
        </section>
      )}

      {!isTerminal && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl text-brand-ink">Actions</h2>
          <div className="flex flex-wrap gap-3">
            {r.statut === "confirmed" && (
              <ConfirmFormButton
                label="Marquer honorée"
                confirmLabel="Confirmer"
                variant="primary"
                action={markHonoredAction}
                hidden={{ id: r.id }}
                successMessage="Réservation marquée honorée."
              >
                <p className="text-sm">
                  Marquer cette réservation comme honorée (client venu) ?
                </p>
              </ConfirmFormButton>
            )}

            {r.statut === "confirmed" && (
              <ConfirmFormButton
                label="Marquer no-show"
                confirmLabel="Confirmer no-show"
                variant="danger"
                action={markNoShowAction}
                hidden={{ id: r.id }}
                successMessage="No-show enregistré."
              >
                <p className="text-sm">
                  Le client n&apos;est pas venu. Confirmer un no-show
                  {r.requiert_garantie && r.stripe_payment_method_id
                    ? ` et prélever ${garantieEuros} € de garantie ?`
                    : "."}
                </p>
                {r.requiert_garantie && r.stripe_payment_method_id && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="charge"
                      value="1"
                      defaultChecked
                      className="accent-brand-olive"
                    />
                    Prélever la garantie ({garantieEuros} €)
                  </label>
                )}
                {r.requiert_garantie && !r.stripe_payment_method_id && (
                  <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2">
                    Garantie demandée mais aucune carte enregistrée.
                    Impossible de prélever.
                  </p>
                )}
              </ConfirmFormButton>
            )}

            <ConfirmFormButton
              label="Annuler la réservation"
              confirmLabel="Confirmer l'annulation"
              variant="danger"
              action={cancelReservationAction}
              hidden={{ id: r.id }}
              successMessage="Réservation annulée et client prévenu."
            >
              <p className="text-sm">
                Le client recevra un email d&apos;annulation. Aucun débit ne sera
                fait (la garantie reste préautorisée le cas échéant).
              </p>
              <label className="block text-sm">
                <span className="block text-xs uppercase tracking-[0.15em] text-brand-text-muted mb-1">
                  Motif (visible par le client)
                </span>
                <textarea
                  name="reason"
                  rows={3}
                  maxLength={500}
                  placeholder="Indisponibilité, salle complète, etc."
                  className="w-full border border-brand-ink/20 bg-white px-3 py-2 text-sm"
                />
              </label>
            </ConfirmFormButton>
          </div>
        </section>
      )}

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

function Field({
  label,
  value,
  full,
}: {
  label: string;
  value: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-[10px] uppercase tracking-[0.15em] text-brand-text-muted mb-1">
        {label}
      </div>
      <div className="text-brand-ink">{value}</div>
    </div>
  );
}
