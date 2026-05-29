"use client";

import { useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

type Props = {
  clientSecret: string;
  publishableKey: string;
  montantGarantieCents: number;
  onSuccess: () => void;
  onBack: () => void;
};

const stripeCache = new Map<string, Promise<Stripe | null>>();

function getStripePromise(key: string): Promise<Stripe | null> {
  let p = stripeCache.get(key);
  if (!p) {
    p = loadStripe(key);
    stripeCache.set(key, p);
  }
  return p;
}

export function CardConfirmationStep(props: Props) {
  const stripePromise = useMemo(
    () => getStripePromise(props.publishableKey),
    [props.publishableKey],
  );
  const montant = (props.montantGarantieCents / 100).toFixed(0);

  return (
    <div className="bg-brand-cream-soft border border-brand-ink/10 px-6 py-8 md:px-10 md:py-10">
      <p className="eyebrow text-brand-olive mb-3">Garantie de réservation</p>
      <h2 className="font-sans text-2xl md:text-3xl text-brand-ink mb-3">
        Une empreinte de carte pour confirmer votre table.
      </h2>
      <p className="text-sm text-brand-text-muted mb-6 leading-relaxed">
        Pour ce service, nous demandons une empreinte de
        <strong className="text-brand-ink"> {montant} €</strong>. Elle n&apos;est
        jamais débitée si vous honorez votre table ou si vous annulez plus de
        24h à l&apos;avance.
      </p>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: props.clientSecret,
          appearance: { theme: "stripe" },
        }}
      >
        <CardForm onSuccess={props.onSuccess} onBack={props.onBack} />
      </Elements>
    </div>
  );
}

function CardForm({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setStatus({ state: "submitting" });
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/reserver?card=confirmed`,
      },
      redirect: "if_required",
    });
    if (error) {
      setStatus({
        state: "error",
        message: error.message ?? "Empreinte refusée.",
      });
      return;
    }
    if (setupIntent && setupIntent.status === "succeeded") {
      onSuccess();
      return;
    }
    setStatus({
      state: "error",
      message: "Statut inattendu. Réessayez ou contactez-nous.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={status.state === "submitting"}
          className="border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors disabled:opacity-50"
        >
          ← Retour
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || status.state === "submitting"}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.state === "submitting"
            ? "Validation en cours..."
            : "Confirmer la carte"}
        </button>
        {status.state === "error" && (
          <p role="alert" className="text-sm text-red-700">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
