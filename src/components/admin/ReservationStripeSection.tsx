import type { ReservationRow } from "@/lib/reservation/repository";
import { ReservationDetailField } from "./ReservationDetailField";

type ReservationStripeSectionProps = {
  reservation: ReservationRow;
};

/** Récapitulatif de la garantie Stripe (SetupIntent, customer, no-show). */
export function ReservationStripeSection({
  reservation: r,
}: ReservationStripeSectionProps) {
  if (!r.requiert_garantie && !r.stripe_setup_intent_id) return null;

  const garantieEuros = r.montant_garantie_cents
    ? (r.montant_garantie_cents / 100).toFixed(0)
    : null;
  const stripeUrlPrefix =
    process.env.STRIPE_LIVEMODE === "true"
      ? "https://dashboard.stripe.com"
      : "https://dashboard.stripe.com/test";

  return (
    <section className="bg-brand-cream-soft border border-brand-olive/30 p-6 text-sm">
      <h2 className="font-sans text-xl text-brand-ink mb-3">Garantie Stripe</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ReservationDetailField
          label="Montant"
          value={garantieEuros ? `${garantieEuros} €` : "—"}
        />
        <ReservationDetailField
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
        <ReservationDetailField
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
        <ReservationDetailField
          label="Payment Method"
          value={
            r.stripe_payment_method_id ? (
              <span className="font-mono text-xs">
                {r.stripe_payment_method_id}
              </span>
            ) : (
              "—"
            )
          }
        />
        {r.stripe_payment_intent_id && (
          <ReservationDetailField
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
  );
}
