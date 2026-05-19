import { LOCALES, type Locale, isLocale } from "./config";

type Entry = { tag: string; q: number };

function parseEntries(header: string): Entry[] {
  return header
    .split(",")
    .map((part): Entry | null => {
      const segments = part.trim().split(";");
      const tag = segments[0]?.trim().toLowerCase();
      if (!tag) return null;
      let q = 1;
      for (let i = 1; i < segments.length; i++) {
        const seg = segments[i]?.trim();
        if (!seg) continue;
        if (seg.startsWith("q=")) {
          const parsed = parseFloat(seg.slice(2));
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { tag, q };
    })
    .filter((e): e is Entry => e !== null && e.q > 0)
    .sort((a, b) => b.q - a.q);
}

/**
 * Picks the highest-quality supported locale from an `Accept-Language` header.
 * Matches BCP-47 sub-tags by their primary language (e.g. `en-US` → `en`,
 * `pt-BR` → `pt`). Unsupported languages fall through to `fallback`.
 */
export function parseAcceptLanguage(header: string, fallback: Locale): Locale {
  if (!header) return fallback;
  const supported = LOCALES as readonly string[];
  const entries = parseEntries(header);
  for (const entry of entries) {
    const base = entry.tag.split("-")[0];
    if (base && isLocale(base) && supported.includes(base)) return base as Locale;
  }
  return fallback;
}
