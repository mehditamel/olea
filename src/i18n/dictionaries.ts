import "server-only";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

type FrModule = typeof import("./dictionaries/fr");
export type Dictionary = FrModule["default"];

const loaders: Record<Locale, () => Promise<{ default: unknown }>> = {
  fr: () => import("./dictionaries/fr"),
  en: () => import("./dictionaries/en"),
  it: () => import("./dictionaries/it"),
  es: () => import("./dictionaries/es"),
  pt: () => import("./dictionaries/pt"),
  ru: () => import("./dictionaries/ru"),
  ar: () => import("./dictionaries/ar"),
};

type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    (value as object).constructor === Object
  );
}

/**
 * Deep-merge `overlay` over `base`. Arrays and primitives in `overlay` replace
 * those in `base` outright. Only plain objects are recursed.
 *
 * Used so a partially-translated locale dictionary still resolves missing keys
 * from the FR source-of-truth at runtime, without crashing the page.
 */
function deepMerge<T>(base: T, overlay: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(overlay)) {
    return (overlay === undefined ? base : (overlay as T));
  }
  const out: Plain = { ...base };
  for (const key of Object.keys(overlay)) {
    const baseVal = base[key];
    const overlayVal = overlay[key];
    if (isPlainObject(baseVal) && isPlainObject(overlayVal)) {
      out[key] = deepMerge(baseVal, overlayVal);
    } else if (overlayVal !== undefined) {
      out[key] = overlayVal;
    }
  }
  return out as T;
}

let frCache: Dictionary | null = null;

async function loadFr(): Promise<Dictionary> {
  if (frCache) return frCache;
  const mod = (await loaders[DEFAULT_LOCALE]()) as { default: Dictionary };
  frCache = mod.default;
  return frCache;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const fr = await loadFr();
  if (locale === DEFAULT_LOCALE) return fr;
  const mod = (await loaders[locale]()) as { default: unknown };
  return deepMerge(fr, mod.default);
}

export function hasLocale(value: string): value is Locale {
  return isLocale(value);
}
