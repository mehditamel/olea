"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const NAV = [
  { href: "/maisons", label: "Maisons" },
  { href: "/carte", label: "Carte" },
  { href: "/privatisation", label: "Privatisation" },
];

const PHONE_TEL = "+33625151333";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-[background-color,border-color,box-shadow] duration-300",
        transparent
          ? "bg-transparent text-brand-cream"
          : "bg-brand-cream/95 backdrop-blur-md text-brand-ink border-b border-brand-ink/8 shadow-[0_1px_0_rgba(31,34,24,0.04)]",
      )}
    >
      {/* Voile de lisibilité quand transparent (sur le hero sombre) */}
      {transparent && (
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-black/30 to-transparent"
          aria-hidden
        />
      )}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-12 md:py-5">
        <Link
          href="/"
          className="block hover:opacity-80 transition-opacity"
          aria-label="Maison Oléa — accueil"
        >
          <Image
            src="/images/brand/logo.png"
            alt="Maison Oléa"
            width={800}
            height={600}
            priority
            sizes="(max-width: 768px) 48px, 64px"
            className={cn(
              "h-10 md:h-12 w-auto transition-[filter] duration-300",
              transparent ? "" : "brightness-0",
            )}
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em]"
        >
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 hover:opacity-70 transition-opacity",
                  active &&
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand-gold",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Appeler Maison Oléa"
            className={cn(
              "md:hidden p-2.5 -mr-1 rounded-full transition-colors",
              transparent
                ? "text-brand-cream hover:bg-brand-cream/10"
                : "text-brand-ink hover:bg-brand-ink/8",
            )}
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <Link
            href="/reserver"
            className={cn(
              "hidden md:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
              transparent
                ? "bg-brand-cream text-brand-ink hover:bg-brand-olive hover:text-brand-cream"
                : "bg-brand-ink text-brand-cream hover:bg-brand-olive",
            )}
          >
            Réserver
          </Link>
          <div className="md:hidden">
            <MobileNav transparent={transparent} />
          </div>
        </div>
      </div>
    </header>
  );
}
