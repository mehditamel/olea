import type { Dictionary } from "./dictionaries";
import { interpolate } from "./format";

/**
 * Dotted path of any string-valued leaf within `T`.
 *
 * For example, given `T = { a: { b: "x" }; c: "y" }`, `LeafPath<T>` resolves
 * to `"a.b" | "c"`. Numbers and arrays are not considered leaves.
 */
type LeafPath<T> = T extends string
  ? ""
  : T extends readonly unknown[]
    ? never
    : T extends object
      ? {
          [K in keyof T & string]: T[K] extends string
            ? K
            : T[K] extends object
              ? `${K}.${LeafPath<T[K]>}`
              : never;
        }[keyof T & string]
      : never;

export type DictPath = LeafPath<Dictionary>;

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Reads a string leaf from `dict` by dotted path with autocomplete-friendly
 * typing, then interpolates `{var}` placeholders if `vars` are provided.
 *
 * Intended as an opt-in convenience for call-sites that need interpolation
 * with dynamic keys — direct `dict.foo.bar` access remains the default for
 * everyday code.
 */
export function t(
  dict: Dictionary,
  key: DictPath,
  vars?: Record<string, string | number>,
): string {
  const raw = get(dict, key);
  if (typeof raw !== "string") return key;
  return vars ? interpolate(raw, vars) : raw;
}
