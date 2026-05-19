import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const reason = request.nextUrl.searchParams.get("reason");
  const target = reason
    ? `/admin/login?error=${encodeURIComponent(reason)}`
    : "/admin/login";
  return NextResponse.redirect(new URL(target, request.url));
}
