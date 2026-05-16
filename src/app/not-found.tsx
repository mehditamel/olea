import Link from "next/link";
import { OliveBranch } from "@/components/brand/OliveBranch";

export default function NotFound() {
  return (
    <section className="relative bg-brand-ink text-brand-cream min-h-[100svh] flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      <OliveBranch
        className="absolute -right-10 -bottom-10 w-72 h-80 md:w-96 md:h-[28rem] text-brand-olive-soft opacity-20 pointer-events-none"
        color="currentColor"
      />
      <div className="relative mx-auto max-w-3xl">
        <p className="eyebrow text-brand-gold mb-5">Erreur 404</p>
        <h1 className="font-serif font-normal text-[clamp(44px,7vw,80px)] leading-[1.02] tracking-[-1px] mb-6">
          Cette page s&apos;est{" "}
          <span className="italic text-brand-gold-light">égarée</span> au soleil.
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-brand-cream/85 max-w-xl mb-10">
          Le lien que vous suivez n&apos;existe plus ou a été déplacé.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-gold transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/maisons"
            className="inline-flex items-center justify-center border border-brand-cream/70 text-brand-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            Nos maisons
          </Link>
        </div>
      </div>
    </section>
  );
}
