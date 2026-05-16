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

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rate = checkRateLimit(`reservation:${ip}`, RATE_LIMIT);
  if (!rate.ok) {
    logger.warn({ ip }, "Reservation rate-limited");
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
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
    return NextResponse.json(
      { error: "Corps de requête invalide (JSON attendu)." },
      { status: 400 },
    );
  }

  const parsed = reservationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot : un bot a rempli le champ caché. On répond OK sans rien faire
  // pour ne pas signaler la détection.
  if (data.siteWeb && data.siteWeb.length > 0) {
    logger.warn({ ip }, "Reservation honeypot triggered");
    return NextResponse.json({ ok: true, mode: "log" });
  }

  const maison = getMaisonBySlug(data.maison);
  if (!maison) {
    return NextResponse.json({ error: "Maison inconnue." }, { status: 400 });
  }
  if (!maison.ouvert) {
    return NextResponse.json(
      { error: "Cette maison n'accepte pas encore de réservations en ligne." },
      { status: 400 },
    );
  }

  if (isIsoDateInPastParis(data.date)) {
    return NextResponse.json(
      { error: "La date doit être à venir." },
      { status: 400 },
    );
  }
  if (isMaisonClosedOn(maison, data.date)) {
    return NextResponse.json(
      { error: "La maison est fermée ce jour-là." },
      { status: 400 },
    );
  }

  const expectedService = getServiceForSlot(maison, data.date, data.heure);
  if (!expectedService) {
    return NextResponse.json(
      { error: "Créneau indisponible pour cette date." },
      { status: 400 },
    );
  }
  if (expectedService !== data.service) {
    return NextResponse.json(
      { error: "Service incohérent avec l'horaire choisi." },
      { status: 400 },
    );
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

  const occasionLabel = OCCASION_LABELS[data.occasion] ?? data.occasion;
  const serviceLabel = data.service === "dejeuner" ? "Déjeuner" : "Dîner";
  const heureLisible = data.heure.replace(":", "h");

  const teamHtml = `
    <h2>Nouvelle réservation · ${escapeHtml(maison.nom)}</h2>
    <ul>
      <li><strong>Nom :</strong> ${escapeHtml(data.nom)}</li>
      <li><strong>Email :</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Téléphone :</strong> ${escapeHtml(data.telephone)}</li>
      <li><strong>Maison :</strong> ${escapeHtml(maison.nom)}</li>
      <li><strong>Date :</strong> ${escapeHtml(data.date)}</li>
      <li><strong>Heure :</strong> ${escapeHtml(heureLisible)} (${escapeHtml(serviceLabel)})</li>
      <li><strong>Convives :</strong> ${data.convives}</li>
      <li><strong>Occasion :</strong> ${escapeHtml(occasionLabel)}</li>
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
    return NextResponse.json(
      { error: "Échec de l'envoi. Veuillez réessayer dans un instant." },
      { status: 502 },
    );
  }

  const ics = buildReservationIcs({
    uid: `${data.date.replace(/-/g, "")}-${data.heure.replace(":", "")}-${data.maison}-${data.email}@olea-restaurant.fr`,
    summary: `Réservation Maison Oléa · ${maison.nom}`,
    description: `Réservation pour ${data.convives} personne(s).${
      data.demandesParticulieres ? ` ${data.demandesParticulieres}` : ""
    }`,
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
    attachment: {
      filename: ics.filename,
      content: ics.contentBase64,
      contentType: "text/calendar",
    },
  });

  if (!clientResult.ok) {
    // L'équipe a bien reçu la demande : on ne fait pas échouer toute la
    // requête, on log et on signale juste un succès partiel.
    logger.warn(
      { err: clientResult.error },
      "Reservation: client confirmation email failed",
    );
  }

  return NextResponse.json({ ok: true, mode: teamResult.mode });
}
