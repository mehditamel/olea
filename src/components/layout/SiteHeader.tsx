"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { MobileNav } from "./MobileNav";
import { LocaleLink } from "@/i18n/LocaleLink";
import { useStrippedPathname } from "@/i18n/LocaleProvider";
import { withLocale } from "@/i18n/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

const PHONE_TEL = "+33625151333";

type Props = { lang: Locale; dict: Dictionary };

export function SiteHeader({ lang, dict }: Props) {
  const stripped = useStrippedPathname();
  const isHome = stripped === "/";
  const [scrolled, setScrolled] = useState(false);
  const scrollDir = useScrollDirection({ topThreshold: 120, delta: 6 });

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;
  const hidden = scrollDir === "down";

  const NAV: { href: string; label: string }[] = [
    { href: "/maisons", label: dict.nav.maisons },
    { href: "/carte", label: dict.nav.carte },
    { href: "/privatisation", label: dict.nav.privatisation },
  ];

  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map());
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  const activeHref =
    NAV.find(
      (item) => stripped === item.href || stripped.startsWith(`${item.href}/`),
    )?.href ?? null;

  useLayoutEffect(() => {
    const computeIndicator = () => {
      const nav = navRef.current;
      if (!nav || !activeHref) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }
      const link = linkRefs.current.get(activeHref);
      if (!link) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    };
    computeIndicator();
    window.addEventListener("resize", computeIndicator);
    return () => window.removeEventListener("resize", computeIndicator);
  }, [activeHref, lang]);

  return (
    <header
      className={cn(
        "fixed top-0 start-0 end-0 z-30 transition-[background-color,border-color,box-shadow,transform] duration-300",
        transparent
          ? "bg-transparent text-brand-cream"
          : "bg-brand-cream/95 backdrop-blur-md text-brand-ink border-b border-brand-ink/8 shadow-[0_1px_0_rgba(31,34,24,0.04)]",
        hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {transparent && (
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-black/30 to-transparent"
          aria-hidden
        />
      )}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-12 md:py-5">
        <LocaleLink
          href="/"
          className="block hover:opacity-80 transition-opacity"
          aria-label={dict.header.ariaLogo}
        >
          <Image
            src="/images/brand/logo.png"
            alt={dict.common.ariaSiteName}
            width={800}
            height={600}
            priority
            sizes="(max-width: 768px) 48px, 64px"
            className={cn(
              "h-10 md:h-12 w-auto transition-[filter] duration-300",
              transparent ? "" : "brightness-0",
            )}
          />
        </LocaleLink>

        <nav
          ref={navRef}
          aria-label={dict.header.ariaNav}
          className="hidden md:flex relative items-center gap-8 text-[11px] uppercase tracking-[0.22em]"
        >
          {NAV.map((item) => {
            const active = activeHref === item.href;
            return (
              <LocaleLink
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current.set(item.href, el);
                }}
                aria-current={active ? "page" : undefined}
                className="relative py-2 hover:opacity-70 transition-opacity"
              >
                {item.label}
              </LocaleLink>
            );
          })}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-0 h-px bg-brand-gold transition-[left,width,opacity] duration-300 ease-out",
              indicator.visible ? "opacity-100" : "opacity-0",
            )}
            style={{ left: indicator.left, width: indicator.width }}
          />
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label={dict.header.ariaPhone}
            className={cn(
              "md:hidden p-2.5 -me-1 rounded-full transition-colors",
              transparent
                ? "text-brand-cream hover:bg-brand-cream/10"
                : "text-brand-ink hover:bg-brand-ink/8",
            )}
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <div className="hidden md:block">
            <LanguageSwitcher lang={lang} dict={dict} pathname={withLocale(lang, stripped)} variant={transparent ? "transparent" : "solid"} />
          </div>
          <LocaleLink
            href="/reserver"
            className={cn(
              "hidden md:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
              transparent
                ? "bg-brand-cream text-brand-ink hover:bg-brand-olive hover:text-brand-cream"
                : "bg-brand-ink text-brand-cream hover:bg-brand-olive",
            )}
          >
            {dict.nav.reserver}
          </LocaleLink>
          <div className="md:hidden">
            <MobileNav transparent={transparent} lang={lang} dict={dict} />
          </div>
        </div>
      </div>
    </header>
  );
}
