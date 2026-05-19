import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

/**
 * Endpoint cible du magic link Supabase. Échange le code contre une session
 * (set des cookies sb-*) puis redirige vers la destination demandée.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/admin";
  const safeNext = next.startsWith("/admin") ? next : "/admin";

  if (!code) {
    return NextResponse.redirect(
      new URL(`/admin/login?error=expired`, request.url),
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    logger.warn({ err: error.message }, "Auth callback exchange failed");
    return NextResponse.redirect(
      new URL(`/admin/login?error=expired`, request.url),
    );
  }
  return NextResponse.redirect(new URL(safeNext, request.url));
}
