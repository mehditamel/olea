import { NextResponse, type NextRequest } from "next/server";
import { expireOldPendingReservations } from "@/lib/reservation/expire";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cron Vercel : appelle ce endpoint à intervalle régulier (5 min).
 * Auth : header `Authorization: Bearer <CRON_SECRET>` requis en prod.
 * Vercel envoie automatiquement ce header si la variable est définie.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }
  try {
    const result = await expireOldPendingReservations();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err: message }, "cron expire failed");
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
