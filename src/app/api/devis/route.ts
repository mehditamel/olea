import { NextResponse } from "next/server";
import { devisSchema } from "@/types/devis";
import { getMaisonBySlug } from "@/data/maisons";
import { sendContactEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = devisSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const maison = getMaisonBySlug(data.maison);
  if (!maison) {
    return NextResponse.json({ error: "maison_unknown" }, { status: 400 });
  }

  logger.info(
    {
      maison: data.maison,
      typeEvenement: data.typeEvenement,
      convives: data.convives,
      date: data.date,
    },
    "Devis received",
  );

  const html = `
    <h2>Nouvelle demande de devis · ${escapeHtml(maison.nom)}</h2>
    <ul>
      <li><strong>Nom :</strong> ${escapeHtml(data.nom)}</li>
      <li><strong>Email :</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Téléphone :</strong> ${escapeHtml(data.telephone)}</li>
      <li><strong>Maison :</strong> ${escapeHtml(maison.nom)}</li>
      <li><strong>Type d'événement :</strong> ${escapeHtml(data.typeEvenement)}</li>
      <li><strong>Convives :</strong> ${data.convives}</li>
      <li><strong>Date :</strong> ${escapeHtml(data.date)}</li>
    </ul>
    ${
      data.message
        ? `<p><strong>Message :</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`
        : ""
    }
  `;

  const result = await sendContactEmail({
    subject: `Devis privatisation — ${maison.nom} (${data.convives} pers.)`,
    html,
    replyTo: data.email,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: result.mode });
}
