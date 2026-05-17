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
  /**
   * "dropdown" (default) renders an absolutely-positioned listbox triggered by
   * a button. "grid" inlines the choices as a 2-col grid — better for narrow
   * mobile drawers where a popover would clip.
   */
  layout?: "dropdown" | "grid";
};

export function LanguageSwitcher({
  lang,
  dict,
  pathname,
  variant = "solid",
  layout = "dropdown",
}: Props) {
  if (layout === "grid") {
    return <GridSwitcher lang={lang} pathname={pathname} variant={variant} />;
  }
  return (
    <DropdownSwitcher
      lang={lang}
      dict={dict}
      pathname={pathname}
      variant={variant}
    />
  );
}

function GridSwitcher({
  lang,
  pathname,
  variant,
}: {
  lang: Locale;
  pathname: string;
  variant: Variant;
}) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {LOCALES.map((l) => {
        const active = l === lang;
        return (
          <li key={l}>
            <form action={switchLocale}>
              <input type="hidden" name="target" value={l} />
              <input type="hidden" name="currentPath" value={pathname} />
              <button
                type="submit"
                aria-current={active ? "true" : undefined}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm border transition-colors",
                  variant === "transparent"
                    ? active
                      ? "border-brand-gold text-brand-gold"
                      : "border-brand-cream/30 text-brand-cream hover:border-brand-gold/60"
                    : active
                      ? "border-brand-olive text-brand-olive font-medium"
                      : "border-brand-ink/15 text-brand-ink hover:border-brand-olive/60",
                )}
              >
                <span className="uppercase tracking-[0.18em] text-[11px]">
                  {l}
                </span>
                <span className="truncate">{localeNativeName(l)}</span>
                {active && <Check className="h-3.5 w-3.5" aria-hidden />}
              </button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}

function DropdownSwitcher({
  lang,
  dict,
  pathname,
  variant,
}: {
  lang: Locale;
  dict: Dictionary;
  pathname: string;
  variant: Variant;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When the menu opens, move focus to the currently-selected language so
  // keyboard users land on the active option (closer to the listbox pattern).
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLButtonElement>(
      'button[aria-selected="true"]',
    );
    node?.focus();
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
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
          ref={listRef}
          role="listbox"
          className="absolute end-0 top-full mt-2 min-w-[200px] bg-brand-cream text-brand-ink shadow-lg border border-brand-ink/8 py-1 z-40"
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
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-brand-text-muted w-6">
                      {l}
                    </span>
                    <span>{localeNativeName(l)}</span>
                  </span>
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
