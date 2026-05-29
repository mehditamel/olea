"use client";

import { useEffect, useState } from "react";
import { OleaSymbol } from "@/components/brand/OleaSymbol";
import { cn } from "@/lib/utils";

/**
 * Bouton « retour en haut » reprenant le symbole « O » de la marque.
 * Apparaît après défilement, desktop uniquement (ne chevauche pas la barre
 * CTA mobile). Respecte `prefers-reduced-motion`.
 */
export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      className={cn(
        "hidden md:flex fixed bottom-6 end-6 z-30 h-11 w-11 items-center justify-center rounded-full",
        "border border-brand-olive/30 bg-brand-cream/90 text-brand-olive backdrop-blur-sm",
        "shadow-[0_8px_24px_-12px_rgba(31,34,24,0.5)] transition-[opacity,transform,background-color,color] duration-300",
        "hover:bg-brand-olive hover:text-brand-cream focus-visible:bg-brand-olive focus-visible:text-brand-cream",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3",
      )}
    >
      <OleaSymbol className="h-5 w-5" />
    </button>
  );
}
