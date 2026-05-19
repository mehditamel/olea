import { NextResponse, type NextRequest } from "next/server";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export async function proxy(request: NextRequest) {
  const { response, user } = await refreshSupabaseSession(request);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith(ADMIN_PREFIX) && pathname !== LOGIN_PATH) {
    if (!user) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === LOGIN_PATH && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|woff2?)$).*)",
  ],
};
