"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const NAV = [
  { href: "/maisons", label: "Maisons" },
  { href: "/carte", label: "Carte" },
  { href: "/privatisation", label: "Privatisation" },
];

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
        "fixed top-0 left-0 right-0 z-30 transition-colors duration-300",
        transparent
          ? "bg-transparent text-brand-cream"
          : "bg-brand-cream/95 backdrop-blur-md text-brand-ink border-b border-brand-ink/8",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 md:py-7">
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
            sizes="(max-width: 768px) 56px, 72px"
            className={cn(
              "h-12 md:h-14 w-auto transition-[filter] duration-300",
              transparent ? "" : "brightness-0",
            )}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.22em]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#reserver"
            className={cn(
              "px-7 py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
              transparent
                ? "bg-brand-cream text-brand-ink hover:bg-brand-olive hover:text-brand-cream"
                : "bg-brand-ink text-brand-cream hover:bg-brand-olive",
            )}
          >
            Réserver
          </Link>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
