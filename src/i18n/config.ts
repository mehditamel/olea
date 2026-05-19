export const LOCALES = ["fr", "en", "it", "es", "pt", "ru", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";
export const RTL_LOCALES: readonly Locale[] = ["ar"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

const HTML_LANG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  it: "it-IT",
  es: "es-ES",
  pt: "pt-PT",
  ru: "ru-RU",
  ar: "ar-SA",
};

export function localeHtmlLang(locale: Locale): string {
  return HTML_LANG[locale];
}

const OG_CODE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  it: "it_IT",
  es: "es_ES",
  pt: "pt_PT",
  ru: "ru_RU",
  ar: "ar_AR",
};

export function localeOgCode(locale: Locale): string {
  return OG_CODE[locale];
}

const NATIVE_NAME: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  ar: "العربية",
};

export function localeNativeName(locale: Locale): string {
  return NATIVE_NAME[locale];
}
