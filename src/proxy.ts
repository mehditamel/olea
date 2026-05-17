import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { parseAcceptLanguage } from "@/i18n/detect";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const IS_PROD = process.env.NODE_ENV === "production";

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

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  // URL already carries a valid locale prefix → just pass through, but sync
  // the cookie if the user landed on a different locale than their last visit.
  if (isLocale(first)) {
    const res = NextResponse.next();
    if (cookieLocale !== first) setCookie(res, first);
    return applyVary(res);
  }

  // No locale in URL → negotiate, redirect, persist the choice.
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
