import { NextResponse } from "next/server";
import { reservationSchema } from "@/types/reservation";
import { getMaisonBySlug } from "@/data/maisons";
import {
  getServiceForSlot,
  isMaisonClosedOn,
} from "@/lib/reservation-slots";
import { isIsoDateInPastParis } from "@/lib/date-paris";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  insertReservation,
  attachStripeIds,
} from "@/lib/reservation/repository";
import { checkCapacite, isCreneauBloque } from "@/lib/reservation/capacity";
import {
  requiresGarantie,
  montantGarantieCents,
} from "@/lib/reservation/garantie";
import {
  sendClientConfirmationFromRow,
  sendTeamReservationEmail,
} from "@/lib/reservation/notify";
import {
  getStripe,
  isStripeConfigured,
  getPublishableKey,
} from "@/lib/stripe/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import { parseAcceptLanguage } from "@/i18n/detect";
import { getDictionary } from "@/i18n/dictionaries";

export const runtime = "nodejs";

const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function resolveLocale(request: Request): Locale {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  if (match && match[1]) {
    const decoded = decodeURIComponent(match[1]);
    if (isLocale(decoded)) return decoded;
  }
  const accept = request.headers.get("accept-language") ?? "";
  return parseAcceptLanguage(accept, DEFAULT_LOCALE);
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rate = checkRateLimit(`reservation:${ip}`, RATE_LIMIT);
  if (!rate.ok) {
    logger.warn({ ip }, "Reservation rate-limited");
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(rate.retryAfterMs / 1000).toString(),
        },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.siteWeb && data.siteWeb.length > 0) {
    logger.warn({ ip }, "Reservation honeypot triggered");
    return NextResponse.json({ ok: true, mode: "log" });
  }

  const maison = getMaisonBySlug(data.maison);
  if (!maison) {
    return NextResponse.json({ error: "maison_unknown" }, { status: 400 });
  }
  if (!maison.ouvert) {
    return NextResponse.json(
      { error: "maison_closed_online" },
      { status: 400 },
    );
  }
  if (isIsoDateInPastParis(data.date)) {
    return NextResponse.json({ error: "past_date" }, { status: 400 });
  }
  if (isMaisonClosedOn(maison, data.date)) {
    return NextResponse.json({ error: "closed_on_date" }, { status: 400 });
  }

  const expectedService = getServiceForSlot(maison, data.date, data.heure);
  if (!expectedService) {
    return NextResponse.json({ error: "invalid_slot" }, { status: 400 });
  }
  if (expectedService !== data.service) {
    return NextResponse.json({ error: "service_mismatch" }, { status: 400 });
  }

  const garantie = requiresGarantie(data.date, data.convives);
  const montantGarantie = garantie ? montantGarantieCents(data.convives) : null;
  const stripeReady = garantie && isStripeConfigured();
  const stripePk = getPublishableKey();
  const lang = resolveLocale(request);
  const dict = await getDictionary(lang);

  if (!isSupabaseConfigured()) {
    logger.warn(
      { maison: data.maison, date: data.date, heure: data.heure },
      "Reservation: Supabase not configured, log-only mode",
    );
    return NextResponse.json({
      ok: true,
      mode: "log",
      requiresCard: false,
    });
  }

  try {
    if (await isCreneauBloque(data.maison, data.date, data.heure)) {
      return NextResponse.json(
        { error: "creneau_bloque" },
        { status: 409 },
      );
    }
    const cap = await checkCapacite(
      data.maison,
      data.date,
      data.service,
      data.convives,
    );
    if (!cap.ok) {
      return NextResponse.json(
        {
          error: "capacite_pleine",
          reste: cap.reste,
        },
        { status: 409 },
      );
    }

    const row = await insertReservation({
      maison_slug: data.maison,
      date: data.date,
      heure: data.heure,
      service: data.service,
      convives: data.convives,
      nom: data.nom,
      email: data.email.toLowerCase(),
      telephone: data.telephone,
      occasion: data.occasion,
      demandes: data.demandesParticulieres,
      statut: stripeReady ? "pending_card" : "confirmed",
      requiert_garantie: garantie,
      montant_garantie_cents: montantGarantie,
      source: "web",
    });

    if (stripeReady) {
      const stripe = getStripe();
      const customer = await stripe.customers.create({
        email: row.email,
        name: row.nom,
        phone: row.telephone,
        metadata: { reservation_id: row.id, maison: row.maison_slug, lang },
      });
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          reservation_id: row.id,
          maison: row.maison_slug,
          date: row.date,
          heure: row.heure,
          convives: String(row.convives),
          montant_garantie_cents: String(montantGarantie ?? 0),
          lang,
        },
      });
      await attachStripeIds(row.id, {
        customerId: customer.id,
        setupIntentId: setupIntent.id,
      });

      await sendTeamReservationEmail(row, maison, true);

      logger.info(
        { id: row.id, setupIntentId: setupIntent.id, customer: customer.id },
        "Reservation created with pending card setup",
      );

      return NextResponse.json({
        ok: true,
        mode: "stripe_setup",
        requiresCard: true,
        reservationId: row.id,
        clientSecret: setupIntent.client_secret,
        publishableKey: stripePk,
        montantGarantieCents: montantGarantie,
      });
    }

    if (garantie && !isStripeConfigured()) {
      logger.warn(
        { id: row.id },
        "Reservation requires garantie but Stripe not configured — manual CB",
      );
    }

    const teamResult = await sendTeamReservationEmail(row, maison, false);
    if (!teamResult.ok) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    await sendClientConfirmationFromRow(row, maison, { lang, dict });

    return NextResponse.json({
      ok: true,
      mode: "confirmed",
      requiresCard: false,
      reservationId: row.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    logger.error({ err: message }, "Reservation flow failed");
    return NextResponse.json({ error: "generic" }, { status: 500 });
  }
}
