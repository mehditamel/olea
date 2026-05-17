import { Resend } from "resend";
import { logger } from "./logger";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatDate, formatTime, interpolate } from "@/i18n/format";

export type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

type SendEmailInput = {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string;
  attachments?: EmailAttachment[];
};

type SendEmailResult =
  | { ok: true; mode: "sent" | "log"; id?: string }
  | { ok: false; mode: "error"; error: string };

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM ?? "Maison Oléa <onboarding@resend.dev>";
const defaultTo = process.env.CONTACT_EMAIL ?? "contact@olea-restaurant.fr";

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * Envoie un email via Resend. Si `RESEND_API_KEY` n'est pas configuré,
 * log le contenu via Pino et retourne un succès en mode "log".
 */
export async function sendContactEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const resend = getClient();
  const to = input.to ?? defaultTo;

  if (!resend) {
    logger.info(
      {
        subject: input.subject,
        to,
        mode: "log",
        reason: "RESEND_API_KEY missing",
        attachments: input.attachments?.map((a) => a.filename),
      },
      "Email logged (no provider configured)",
    );
    return { ok: true, mode: "log" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
      attachments: input.attachments,
    });
    if (error) {
      logger.error({ err: error }, "Resend error");
      return { ok: false, mode: "error", error: error.message };
    }
    return { ok: true, mode: "sent", id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err: message }, "Resend exception");
    return { ok: false, mode: "error", error: message };
  }
}

type ReservationConfirmationInput = {
  to: string;
  nom: string;
  maisonNom: string;
  adresse: string;
  ville: string;
  telephoneAffichage: string;
  date: string;
  heure: string;
  service: "dejeuner" | "diner";
  convives: number;
  demandesParticulieres: string;
  attachment: EmailAttachment;
  lang: Locale;
  dict: Dictionary;
};

/**
 * Envoie un email de récap chaleureux au client (localisé) avec la PJ .ics.
 */
export function sendReservationConfirmation(
  input: ReservationConfirmationInput,
): Promise<SendEmailResult> {
  const { dict, lang } = input;
  const t = dict.emails.reservation;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const serviceLabel = t.services[input.service];
  const dateLisible = formatDate(input.date, lang);
  const heureLisible = formatTime(input.heure, lang);
  const subject = interpolate(t.subject, {
    date: dateLisible,
    heure: heureLisible,
  });
  const phoneClean = input.telephoneAffichage.replace(/\s/g, "");
  const phoneLink = `<a href="tel:${escapeHtml(phoneClean)}" style="color:#4a5530"><bdi dir="ltr">${escapeHtml(input.telephoneAffichage)}</bdi></a>`;
  const pieceJointeParts = t.pieceJointe.split("{telephone}");
  const pieceJointeHtml = pieceJointeParts
    .map((p) => escapeHtml(p))
    .join(phoneLink);

  const html = `
    <div dir="${dir}" style="font-family:Georgia,'Cormorant Garamond',serif;color:#1f2218;line-height:1.6;max-width:560px">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#4a5530;margin:0 0 12px">
        ${escapeHtml(interpolate(t.eyebrow, { nom: input.maisonNom }))}
      </p>
      <h1 style="font-size:28px;font-weight:normal;margin:0 0 16px">
        ${escapeHtml(interpolate(t.bonjour, { nom: input.nom }))}
      </h1>
      <p style="margin:0 0 14px">${escapeHtml(t.corpus)}</p>
      <ul style="list-style:none;padding:14px 16px;margin:18px 0;background:#f4ecdd;font-family:Inter,system-ui,sans-serif;font-size:14px">
        <li><strong>${escapeHtml(t.labels.maison)} :</strong> ${escapeHtml(input.maisonNom)} — <bdi>${escapeHtml(input.adresse)}, ${escapeHtml(input.ville)}</bdi></li>
        <li><strong>${escapeHtml(t.labels.date)} :</strong> ${escapeHtml(dateLisible)}</li>
        <li><strong>${escapeHtml(t.labels.heure)} :</strong> <bdi dir="ltr">${escapeHtml(heureLisible)}</bdi> (${escapeHtml(serviceLabel)})</li>
        <li><strong>${escapeHtml(t.labels.convives)} :</strong> ${input.convives}</li>
        ${
          input.demandesParticulieres
            ? `<li style="margin-top:8px"><strong>${escapeHtml(t.labels.precisions)} :</strong><br>${escapeHtml(
                input.demandesParticulieres,
              ).replace(/\n/g, "<br>")}</li>`
            : ""
        }
      </ul>
      <p style="margin:0 0 14px;font-family:Inter,system-ui,sans-serif;font-size:14px">
        ${pieceJointeHtml}
      </p>
      <p style="margin:24px 0 0;font-style:italic;color:#6b5d4a">
        ${escapeHtml(t.signature)}<br>${escapeHtml(t.signatureLigne2)}
      </p>
    </div>
  `;

  return sendContactEmail({
    subject,
    html,
    to: input.to,
    attachments: [input.attachment],
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
