import "server-only";
import type { Maison } from "@/types/maison";
import {
  sendContactEmail,
  sendReservationConfirmation,
} from "@/lib/email";
import { buildReservationIcs } from "@/lib/ics";
import { logger } from "@/lib/logger";
import { interpolate } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ReservationRow } from "./repository";

const APP_BASE_URL =
  process.env.APP_BASE_URL ??
  process.env.SITE_URL ??
  "https://olea-restaurant.fr";
const RESERVATION_DURATION_MIN = Number(
  process.env.RESERVATION_DUREE_MIN ?? 90,
);

const OCCASION_LABELS: Record<string, string> = {
  aucune: "—",
  anniversaire: "Anniversaire",
  romantique: "Romantique",
  famille: "Famille",
  professionnel: "Repas professionnel",
  autre: "Autre",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Envoie au client le mail de confirmation final (localisé), avec .ics +
 * lien d'annulation. Si lang/dict non fournis (cas webhook Stripe), on
 * tombe sur le français par défaut.
 */
export async function sendClientConfirmationFromRow(
  row: ReservationRow,
  maison: Maison,
  i18n?: { lang: Locale; dict: Dictionary },
): Promise<void> {
  const lang = i18n?.lang ?? DEFAULT_LOCALE;
  const dict = i18n?.dict ?? (await getDictionary(lang));
  const t = dict.ics;

  const summary = interpolate(t.summary, { nom: maison.nom });
  const descriptionBase = interpolate(t.descriptionPersonnes, {
    n: row.convives,
  });
  const description = row.demandes
    ? `${descriptionBase} ${row.demandes}`
    : descriptionBase;

  const ics = buildReservationIcs({
    uid: `${row.id}@olea-restaurant.fr`,
    summary,
    description,
    location: `${maison.nom}, ${maison.adresse}, ${maison.codePostal} ${maison.ville}`,
    startIso: row.date,
    heure: row.heure.slice(0, 5),
    durationMinutes: RESERVATION_DURATION_MIN,
    organizerEmail:
      process.env.CONTACT_EMAIL ?? "contact@olea-restaurant.fr",
    attendeeEmail: row.email,
  });

  const result = await sendReservationConfirmation({
    to: row.email,
    nom: row.nom,
    maisonNom: maison.nom,
    adresse: maison.adresse,
    ville: maison.ville,
    telephoneAffichage: maison.telephoneAffichage,
    date: row.date,
    heure: row.heure.slice(0, 5),
    service: row.service,
    convives: row.convives,
    demandesParticulieres: row.demandes,
    lang,
    dict,
    attachment: {
      filename: ics.filename,
      content: ics.contentBase64,
      contentType: "text/calendar",
    },
    cancellationUrl: `${APP_BASE_URL}/reserver/cancel/${row.cancellation_token}`,
    requiertGarantie: row.requiert_garantie,
    montantGarantieCents: row.montant_garantie_cents,
  });
  if (!result.ok) {
    logger.warn(
      { err: result.error, id: row.id },
      "Client confirmation email failed",
    );
  }
}

/**
 * Email à l'équipe quand une nouvelle réservation arrive (toujours en FR,
 * audience interne).
 */
export async function sendTeamReservationEmail(
  row: ReservationRow,
  maison: Maison,
  awaitingCard: boolean,
): Promise<{ ok: boolean; mode?: string }> {
  const serviceLabel = row.service === "dejeuner" ? "Déjeuner" : "Dîner";
  const heureLisible = row.heure.slice(0, 5).replace(":", "h");
  const occasionLabel = OCCASION_LABELS[row.occasion] ?? row.occasion;
  const status = awaitingCard
    ? `<p style="color:#b78030"><strong>⚠ En attente d'empreinte CB</strong> — la réservation n'est pas encore confirmée.</p>`
    : "";
  const html = `
    <h2>Nouvelle réservation · ${escapeHtml(maison.nom)}</h2>
    ${status}
    <ul>
      <li><strong>Nom :</strong> ${escapeHtml(row.nom)}</li>
      <li><strong>Email :</strong> ${escapeHtml(row.email)}</li>
      <li><strong>Téléphone :</strong> ${escapeHtml(row.telephone)}</li>
      <li><strong>Maison :</strong> ${escapeHtml(maison.nom)}</li>
      <li><strong>Date :</strong> ${escapeHtml(row.date)}</li>
      <li><strong>Heure :</strong> ${escapeHtml(heureLisible)} (${escapeHtml(serviceLabel)})</li>
      <li><strong>Convives :</strong> ${row.convives}</li>
      <li><strong>Occasion :</strong> ${escapeHtml(occasionLabel)}</li>
      ${row.requiert_garantie ? `<li><strong>Garantie CB :</strong> ${(row.montant_garantie_cents ?? 0) / 100} €</li>` : ""}
      <li><strong>ID :</strong> ${escapeHtml(row.id)}</li>
    </ul>
    ${
      row.demandes
        ? `<p><strong>Demandes particulières :</strong><br>${escapeHtml(row.demandes).replace(/\n/g, "<br>")}</p>`
        : ""
    }
  `;
  const result = await sendContactEmail({
    subject: `Réservation — ${maison.nom} · ${row.date} ${heureLisible} · ${row.convives} pers.${awaitingCard ? " (CB en attente)" : ""}`,
    html,
    replyTo: row.email,
  });
  return { ok: result.ok, mode: result.ok ? result.mode : undefined };
}
