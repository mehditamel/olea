"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

const SITE_URL =
  process.env.APP_BASE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";
const emailSchema = z.string().email();

export async function requestMagicLinkAction(
  formData: FormData,
): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const next = String(formData.get("next") ?? "/admin");
  const safeNext = next.startsWith("/admin") ? next : "/admin";

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
  redirect(
    `/admin/login?sent=1&email=${encodeURIComponent(parsed.data)}&next=${encodeURIComponent(safeNext)}`,
  );
}

export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
