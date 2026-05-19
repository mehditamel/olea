import { describe, expect, it } from "vitest";
import fr from "../dictionaries/fr";
import en from "../dictionaries/en";
import esDict from "../dictionaries/es";
import ptDict from "../dictionaries/pt";
import itDict from "../dictionaries/it";
import ruDict from "../dictionaries/ru";
import arDict from "../dictionaries/ar";

const NON_FR = {
  en,
  it: itDict,
  es: esDict,
  pt: ptDict,
  ru: ruDict,
  ar: arDict,
} as const;

type Path = string;

/**
 * Collects every dotted path that leads to a string leaf in the given dict.
 * Arrays are walked positionally (`items.0.titre`) so per-item shape mismatches
 * are detected too.
 */
function leafPaths(value: unknown, prefix: Path = ""): Path[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) {
    return value.flatMap((v, i) =>
      leafPaths(v, prefix ? `${prefix}.${i}` : `${i}`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      leafPaths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [];
}

const frPaths = new Set(leafPaths(fr));

/**
 * Paths that are legitimately allowed to exist outside FR. CLDR plural rules
 * mandate extra `zero`/`two`/`few`/`many` forms for Arabic, Russian, etc.,
 * even though FR only needs `one`/`other`.
 */
const ALLOW_EXTRA = /\.personnePlurals\.(zero|two|few|many)$/;

describe("dictionaries completeness", () => {
  for (const [code, dict] of Object.entries(NON_FR)) {
    it(`${code} covers every FR leaf path`, () => {
      const localePaths = new Set(leafPaths(dict));
      const missing = [...frPaths].filter((p) => !localePaths.has(p));
      const extra = [...localePaths].filter(
        (p) => !frPaths.has(p) && !ALLOW_EXTRA.test(p),
      );
      expect({ missing, extra }).toEqual({ missing: [], extra: [] });
    });
  }
});
