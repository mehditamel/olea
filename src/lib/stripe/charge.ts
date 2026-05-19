import "server-only";
import { getStripe } from "./server";
import { logger } from "@/lib/logger";

export type ChargeResult =
  | {
      ok: true;
      paymentIntentId: string;
      chargeId: string | null;
      amount: number;
    }
  | {
      ok: false;
      error: string;
      code?: string;
      paymentIntentId?: string;
    };

/**
 * Charge la garantie en off_session (no-show). Requiert customer + PM enregistrés
 * via SetupIntent. Le PaymentIntent est créé et confirmé en une fois.
 */
export async function chargeNoShow(input: {
  customerId: string;
  paymentMethodId: string;
  amountCents: number;
  reservationId: string;
  description?: string;
}): Promise<ChargeResult> {
  const stripe = getStripe();
  try {
    const intent = await stripe.paymentIntents.create({
      amount: input.amountCents,
      currency: "eur",
      customer: input.customerId,
      payment_method: input.paymentMethodId,
      off_session: true,
      confirm: true,
      description:
        input.description ?? `No-show garantie · résa ${input.reservationId}`,
      metadata: {
        reservation_id: input.reservationId,
        type: "noshow_guarantee",
      },
    });
    if (intent.status !== "succeeded") {
      return {
        ok: false,
        error: `PaymentIntent en statut ${intent.status}`,
        paymentIntentId: intent.id,
      };
    }
    const chargeId =
      typeof intent.latest_charge === "string"
        ? intent.latest_charge
        : (intent.latest_charge?.id ?? null);
    return {
      ok: true,
      paymentIntentId: intent.id,
      chargeId,
      amount: intent.amount,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    let code: string | undefined;
    let pmIntentId: string | undefined;
    if (err && typeof err === "object") {
      const e = err as { code?: string; payment_intent?: { id?: string } };
      code = e.code;
      pmIntentId = e.payment_intent?.id;
    }
    logger.warn(
      { err: message, code, reservationId: input.reservationId },
      "Stripe no-show charge failed",
    );
    return {
      ok: false,
      error: message,
      code,
      paymentIntentId: pmIntentId,
    };
  }
}
