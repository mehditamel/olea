import { NextResponse } from "next/server";
import { reservationSchema } from "@/types/reservation";
import { getMaisonBySlug } from "@/data/maisons";
import { getServiceForSlot } from "@/lib/reservation-slots";
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

const OCCASION_LABELS: Record<string, string> = {
  aucune: "—",
  anniversaire: "Anniversaire",
  romantique: "Romantique",
  famille: "Famille",
  professionnel: "Repas professionnel",
  autre: "Autre",
};

export async function POST(request: Request) {
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

  const html = `
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

  const result = await sendContactEmail({
    subject: `Réservation — ${maison.nom} · ${data.date} ${heureLisible} · ${data.convives} pers.`,
    html,
    replyTo: data.email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Échec de l'envoi. Veuillez réessayer dans un instant." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: result.mode });
}
