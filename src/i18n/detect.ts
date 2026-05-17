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

export function parseAcceptLanguage(header: string, fallback: Locale): Locale {
  if (!header) return fallback;
  const entries = parseEntries(header);
  for (const entry of entries) {
    const base = entry.tag.split("-")[0];
    if (base && isLocale(base) && (LOCALES as readonly string[]).includes(base)) {
      return base as Locale;
    }
    if (isLocale(entry.tag)) return entry.tag;
  }
  return fallback;
}
