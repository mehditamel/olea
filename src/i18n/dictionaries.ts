import "server-only";
import type { Locale } from "./config";
import { isLocale } from "./config";

type FrModule = typeof import("./dictionaries/fr");
export type Dictionary = FrModule["default"];

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  fr: () => import("./dictionaries/fr"),
  en: () => import("./dictionaries/en"),
  it: () => import("./dictionaries/it"),
  es: () => import("./dictionaries/es"),
  pt: () => import("./dictionaries/pt"),
  ru: () => import("./dictionaries/ru"),
  ar: () => import("./dictionaries/ar"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = loaders[locale];
  const mod = await loader();
  return mod.default;
}

export function hasLocale(value: string): value is Locale {
  return isLocale(value);
}
