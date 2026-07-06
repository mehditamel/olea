"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const SITE_URL =
  process.env.APP_BASE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";
const emailSchema = z.string().email();
const MAGIC_LINK_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

async function requestIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

export async function requestMagicLinkAction(
  formData: FormData,
): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const next = String(formData.get("next") ?? "/admin");
  const safeNext = next.startsWith("/admin") ? next : "/admin";

  const ip = await requestIp();
  const rate = checkRateLimit(`magiclink:${ip}`, MAGIC_LINK_RATE_LIMIT);
  if (!rate.ok) {
    logger.warn({ ip }, "Magic link rate-limited");
    redirect(`/admin/login?error=rate&next=${encodeURIComponent(safeNext)}`);
  }

  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    redirect(`/admin/login?error=email&next=${encodeURIComponent(safeNext)}`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      shouldCreateUser: false,
    },
  });
  if (error) {
    logger.warn({ err: error.message }, "Magic link request failed");
    redirect(
      `/admin/login?error=send&next=${encodeURIComponent(safeNext)}`,
    );
  }
  // On n'écho pas l'email dans l'URL (éviterait sa fuite dans les logs d'accès).
  redirect(`/admin/login?sent=1&next=${encodeURIComponent(safeNext)}`);
}

export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
