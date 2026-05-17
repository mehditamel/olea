import type { Locale } from "./config";
import type { Jour } from "@/types/maison";

const JOUR_TO_DAY: Record<Jour, number> = {
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
  dimanche: 0,
};

const HTML_LANG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  it: "it-IT",
  es: "es-ES",
  pt: "pt-PT",
  ru: "ru-RU",
  ar: "ar-SA",
};

export function formatJour(jour: Jour, locale: Locale): string {
  const dayIdx = JOUR_TO_DAY[jour];
  // Date 2024-01-07 is a Sunday; offset to reach the desired day-of-week.
  const base = new Date(Date.UTC(2024, 0, 7 + dayIdx));
  return new Intl.DateTimeFormat(HTML_LANG[locale], { weekday: "long" }).format(
    base,
  );
}

export function formatTime(hhmm: string, locale: Locale): string {
  const parts = hhmm.split(":");
  const h = parts[0];
  const m = parts[1];
  if (!h || !m) return hhmm;
  const date = new Date(Date.UTC(2024, 0, 1, parseInt(h, 10), parseInt(m, 10)));
  return new Intl.DateTimeFormat(HTML_LANG[locale], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = vars[key];
    return v === undefined ? `{${key}}` : String(v);
  });
}
