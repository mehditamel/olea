import type { ReservationRow } from "@/lib/reservation/repository";
import { ConfirmFormButton } from "./ConfirmFormButton";

type AdminAction = (
  formData: FormData,
) => Promise<{ ok: boolean; error?: string }>;

const STATUTS_TERMINAUX = [
  "cancelled_by_client",
  "cancelled_by_staff",
  "noshow",
  "honored",
  "expired",
];

type ReservationActionsProps = {
  reservation: ReservationRow;
  markHonoredAction: AdminAction;
  markNoShowAction: AdminAction;
  cancelReservationAction: AdminAction;
};

/** Actions équipe sur une réservation active (honorée, no-show, annulation). */
export function ReservationActions({
  reservation: r,
  markHonoredAction,
  markNoShowAction,
  cancelReservationAction,
}: ReservationActionsProps) {
  if (STATUTS_TERMINAUX.includes(r.statut)) return null;

  const garantieEuros = r.montant_garantie_cents
    ? (r.montant_garantie_cents / 100).toFixed(0)
    : null;

  return (
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
                Garantie demandée mais aucune carte enregistrée. Impossible de
                prélever.
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
  );
}
