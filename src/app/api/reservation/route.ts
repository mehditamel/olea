import { NextResponse } from "next/server";
import { reservationSchema } from "@/types/reservation";
import { getMaisonBySlug } from "@/data/maisons";
import {
  getServiceForSlot,
  isMaisonClosedOn,
} from "@/lib/reservation-slots";
import { isIsoDateInPastParis } from "@/lib/date-paris";
import {
  sendContactEmail,
  sendReservationConfirmation,
} from "@/lib/email";
import { buildReservationIcs } from "@/lib/ics";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import { parseAcceptLanguage } from "@/i18n/detect";
import { getDictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/format";

export const runtime = "nodejs";

const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };
const RESERVATION_DURATION_MIN = 90;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const OCCASION_LABELS: Record<string, string> = {
  aucune: "—",
  anniversaire: "Anniversaire",
  romantique: "Romantique",
  famille: "Famille",
  professionnel: "Repas professionnel",
  autre: "Autre",
};

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

  logger.info(
    {
      maison: data.maison,
      date: data.date,
      heure: data.heure,
      service: data.service,
      convives: data.convives,
    },
    "Reservation received",
  );

  const lang = resolveLocale(request);
  const dict = await getDictionary(lang);

  const occasionLabel = OCCASION_LABELS[data.occasion] ?? data.occasion;
  const serviceLabelFr = data.service === "dejeuner" ? "Déjeuner" : "Dîner";
  const heureLisible = data.heure.replace(":", "h");

  // Email équipe : reste en FR (audience interne).
  const teamHtml = `
    <h2>Nouvelle réservation · ${escapeHtml(maison.nom)}</h2>
    <ul>
      <li><strong>Nom :</strong> ${escapeHtml(data.nom)}</li>
      <li><strong>Email :</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Téléphone :</strong> ${escapeHtml(data.telephone)}</li>
      <li><strong>Maison :</strong> ${escapeHtml(maison.nom)}</li>
      <li><strong>Date :</strong> ${escapeHtml(data.date)}</li>
      <li><strong>Heure :</strong> ${escapeHtml(heureLisible)} (${escapeHtml(serviceLabelFr)})</li>
      <li><strong>Convives :</strong> ${data.convives}</li>
      <li><strong>Occasion :</strong> ${escapeHtml(occasionLabel)}</li>
      <li><strong>Langue client :</strong> ${escapeHtml(lang)}</li>
    </ul>
    ${
      data.demandesParticulieres
        ? `<p><strong>Demandes particulières :</strong><br>${escapeHtml(
            data.demandesParticulieres,
          ).replace(/\n/g, "<br>")}</p>`
        : ""
    }
  `;

  const teamResult = await sendContactEmail({
    subject: `Réservation — ${maison.nom} · ${data.date} ${heureLisible} · ${data.convives} pers.`,
    html: teamHtml,
    replyTo: data.email,
  });

  if (!teamResult.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  const icsSummary = interpolate(dict.ics.summary, { nom: maison.nom });
  const icsDescriptionBase = interpolate(dict.ics.descriptionPersonnes, {
    n: data.convives,
  });
  const icsDescription = data.demandesParticulieres
    ? `${icsDescriptionBase} ${data.demandesParticulieres}`
    : icsDescriptionBase;

  const ics = buildReservationIcs({
    uid: `${data.date.replace(/-/g, "")}-${data.heure.replace(":", "")}-${data.maison}-${data.email}@olea-restaurant.fr`,
    summary: icsSummary,
    description: icsDescription,
    location: `${maison.nom}, ${maison.adresse}, ${maison.codePostal} ${maison.ville}`,
    startIso: data.date,
    heure: data.heure,
    durationMinutes: RESERVATION_DURATION_MIN,
    organizerEmail: process.env.CONTACT_EMAIL ?? "contact@olea-restaurant.fr",
    attendeeEmail: data.email,
  });

  const clientResult = await sendReservationConfirmation({
    to: data.email,
    nom: data.nom,
    maisonNom: maison.nom,
    adresse: maison.adresse,
    ville: maison.ville,
    telephoneAffichage: maison.telephoneAffichage,
    date: data.date,
    heure: data.heure,
    service: data.service,
    convives: data.convives,
    demandesParticulieres: data.demandesParticulieres,
    lang,
    dict,
    attachment: {
      filename: ics.filename,
      content: ics.contentBase64,
      contentType: "text/calendar",
    },
  });

  if (!clientResult.ok) {
    logger.warn(
      { err: clientResult.error },
      "Reservation: client confirmation email failed",
    );
  }

  return NextResponse.json({ ok: true, mode: teamResult.mode });
}
