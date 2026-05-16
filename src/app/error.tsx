"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Olea page error:", error);
  }, [error]);

  return (
    <section className="bg-brand-ink text-brand-cream min-h-[80svh] flex items-center px-6 md:px-12 pt-32 pb-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-brand-gold mb-5">Une erreur est survenue</p>
        <h1 className="font-serif font-normal text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.5px] mb-6">
          Pardonnez-nous,{" "}
          <span className="italic text-brand-gold-light">un instant.</span>
        </h1>
        <p className="font-serif italic text-lg text-brand-cream/85 mb-8">
          Cette page n&apos;a pas pu s&apos;afficher correctement. Réessayez,
          ou revenez à l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-gold transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-brand-cream/70 text-brand-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
