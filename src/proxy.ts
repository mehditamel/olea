import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { parseAcceptLanguage } from "@/i18n/detect";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const IS_PROD = process.env.NODE_ENV === "production";

const ADMIN_PREFIX = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";
const AUTH_CALLBACK_PATH = "/auth/callback";

function setCookie(res: NextResponse, locale: string): void {
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: IS_PROD,
  });
}

function applyVary(res: NextResponse): NextResponse {
  res.headers.append("Vary", "Accept-Language");
  res.headers.append("Vary", "Cookie");
  return res;
}

function isAuthAdminPath(pathname: string): boolean {
  return (
    pathname === AUTH_CALLBACK_PATH ||
    pathname.startsWith(ADMIN_PREFIX + "/") ||
    pathname === ADMIN_PREFIX
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Admin & auth callback : pas de locale routing, mais session Supabase
  // rafraîchie + redirects auth.
  if (isAuthAdminPath(pathname)) {
    const { response, user } = await refreshSupabaseSession(request);
    if (pathname.startsWith(ADMIN_PREFIX) && pathname !== ADMIN_LOGIN_PATH) {
      if (!user) {
        const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
    if (pathname === ADMIN_LOGIN_PATH && user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  // Pages publiques : routage locale.
  const first = pathname.split("/")[1] ?? "";
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (isLocale(first)) {
    const res = NextResponse.next();
    if (cookieLocale !== first) setCookie(res, first);
    return applyVary(res);
  }

  const accept = request.headers.get("accept-language") ?? "";
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : parseAcceptLanguage(accept, DEFAULT_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const res = NextResponse.redirect(url);
  setCookie(res, locale);
  return applyVary(res);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|.*\\..*).*)"],
};
