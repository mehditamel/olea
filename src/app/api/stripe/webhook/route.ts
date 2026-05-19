import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getMaisonBySlug } from "@/data/maisons";
import { logger } from "@/lib/logger";
import {
  getStripe,
  isStripeConfigured,
  getWebhookSecret,
} from "@/lib/stripe/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  attachStripeIds,
  findReservationBySetupIntent,
  updateStatut,
} from "@/lib/reservation/repository";
import { sendClientConfirmationFromRow } from "@/lib/reservation/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Idempotence : ne traite chaque event_id qu'une fois.
 * Retourne true si déjà traité.
 */
async function markEventProcessed(eventId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("stripe_events_processed")
    .insert({ event_id: eventId });
  if (error) {
    if (error.code === "23505") return true;
    throw new Error(`Mark event failed: ${error.message}`);
  }
  return false;
}

export async function POST(request: Request) {
  if (!isStripeConfigured() || !isSupabaseConfigured()) {
    logger.warn(
      { stripe: isStripeConfigured(), supabase: isSupabaseConfigured() },
      "Webhook ignored: services not configured",
    );
    return NextResponse.json({ received: true, skipped: true });
  }
  const secret = getWebhookSecret();
  if (!secret) {
    logger.error({}, "STRIPE_WEBHOOK_SECRET manquant — webhook refusé");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 },
    );
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }
  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    logger.warn({ err: message }, "Webhook signature verification failed");
    return NextResponse.json(
      { error: `Invalid signature: ${message}` },
      { status: 400 },
    );
  }

  try {
    const alreadyProcessed = await markEventProcessed(event.id);
    if (alreadyProcessed) {
      logger.info({ eventId: event.id, type: event.type }, "Event replay");
      return NextResponse.json({ received: true, duplicate: true });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    logger.error({ err: message }, "Event idempotency check failed");
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }

  logger.info({ eventId: event.id, type: event.type }, "Stripe event");

  try {
    switch (event.type) {
      case "setup_intent.succeeded":
        await handleSetupIntentSucceeded(event.data.object);
        break;
      case "setup_intent.setup_failed":
      case "setup_intent.canceled":
        await handleSetupIntentFailed(event.data.object);
        break;
      default:
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    logger.error(
      { err: message, eventId: event.id, type: event.type },
      "Webhook handler failed",
    );
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleSetupIntentSucceeded(
  setupIntent: Stripe.SetupIntent,
): Promise<void> {
  const reservation = await findReservationBySetupIntent(setupIntent.id);
  if (!reservation) {
    logger.warn({ setupIntentId: setupIntent.id }, "Reservation not found");
    return;
  }
  if (reservation.statut !== "pending_card") {
    logger.info(
      { id: reservation.id, statut: reservation.statut },
      "SetupIntent succeeded but reservation already finalized",
    );
    return;
  }
  const paymentMethodId =
    typeof setupIntent.payment_method === "string"
      ? setupIntent.payment_method
      : setupIntent.payment_method?.id;
  if (paymentMethodId) {
    await attachStripeIds(reservation.id, { paymentMethodId });
  }
  await updateStatut(reservation.id, "confirmed");

  const maison = getMaisonBySlug(reservation.maison_slug);
  if (maison) {
    await sendClientConfirmationFromRow(
      { ...reservation, statut: "confirmed" },
      maison,
    );
  }
  logger.info({ id: reservation.id }, "Reservation confirmed via SetupIntent");
}

async function handleSetupIntentFailed(
  setupIntent: Stripe.SetupIntent,
): Promise<void> {
  const reservation = await findReservationBySetupIntent(setupIntent.id);
  if (!reservation) return;
  if (reservation.statut !== "pending_card") return;
  await updateStatut(reservation.id, "expired");
  logger.warn(
    { id: reservation.id, setupIntentId: setupIntent.id },
    "Reservation expired after SetupIntent failure/cancel",
  );
}
