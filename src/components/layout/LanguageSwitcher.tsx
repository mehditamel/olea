"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LOCALES,
  type Locale,
  localeNativeName,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { switchLocale } from "@/i18n/actions";

type Variant = "transparent" | "solid";

type Props = {
  lang: Locale;
  dict: Dictionary;
  pathname: string;
  variant?: Variant;
};

export function LanguageSwitcher({
  lang,
  dict,
  pathname,
  variant = "solid",
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.languageSwitcher.aria}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] uppercase tracking-[0.2em] rounded-full transition-colors",
          variant === "transparent"
            ? "text-brand-cream hover:bg-brand-cream/10"
            : "text-brand-ink hover:bg-brand-ink/8",
        )}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full mt-2 min-w-[180px] bg-brand-cream text-brand-ink shadow-lg border border-brand-ink/8 py-1 z-40"
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <form action={switchLocale}>
                <input type="hidden" name="target" value={l} />
                <input type="hidden" name="currentPath" value={pathname} />
                <button
                  type="submit"
                  role="option"
                  aria-selected={l === lang}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 ps-4 pe-3 py-2 text-sm hover:bg-brand-ink/5 transition-colors",
                    l === lang && "font-medium",
                  )}
                >
                  <span>{localeNativeName(l)}</span>
                  {l === lang && <Check className="h-4 w-4" aria-hidden />}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
