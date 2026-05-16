import { Resend } from "resend";
import { logger } from "./logger";

type SendEmailInput = {
  subject: string;
  html: string;
  replyTo?: string;
};

type SendEmailResult =
  | { ok: true; mode: "sent" | "log"; id?: string }
  | { ok: false; mode: "error"; error: string };

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM ?? "Maison Oléa <onboarding@resend.dev>";
const to = process.env.CONTACT_EMAIL ?? "contact@olea-restaurant.fr";

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * Envoie un email via Resend. Si `RESEND_API_KEY` n'est pas configuré,
 * log le contenu via Pino et retourne un succès en mode "log" (pas d'erreur
 * en dev, mais aucun email envoyé).
 */
export async function sendContactEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const resend = getClient();

  if (!resend) {
    logger.info(
      { subject: input.subject, mode: "log", reason: "RESEND_API_KEY missing" },
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
