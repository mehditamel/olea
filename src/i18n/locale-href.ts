import { isLocale, type Locale } from "./config";

export function withLocale(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return `/${locale}/${path}`;
  if (path === "/") return `/${locale}`;
  const first = path.split("/")[1] ?? "";
  if (isLocale(first)) {
    const rest = path.slice(first.length + 1);
    return `/${locale}${rest === "" ? "" : rest}`;
  }
  return `/${locale}${path}`;
}

export function stripLocale(pathname: string): string {
  if (!pathname.startsWith("/")) return pathname;
  const first = pathname.split("/")[1] ?? "";
  if (!isLocale(first)) return pathname;
  const rest = pathname.slice(first.length + 1);
  return rest === "" ? "/" : rest;
}

export function replaceLocale(pathname: string, target: Locale): string {
  return withLocale(target, stripLocale(pathname));
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/")[1] ?? "";
  return isLocale(first) ? first : null;
}
