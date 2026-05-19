"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "./config";
import { isRtl } from "./config";
import type { Dictionary } from "./dictionaries";
import { stripLocale } from "./locale-href";

type Ctx = {
  lang: Locale;
  dict: Dictionary;
  dir: "ltr" | "rtl";
};

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(
    () => ({ lang, dict, dir: isRtl(lang) ? "rtl" : "ltr" }),
    [lang, dict],
  );
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useI18n must be used inside <LocaleProvider>");
  return ctx;
}

export function useStrippedPathname(): string {
  const pathname = usePathname() ?? "/";
  return stripLocale(pathname);
}
