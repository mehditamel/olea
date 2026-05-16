import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { OliveBranch } from "@/components/brand/OliveBranch";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-[680px] md:h-[92vh] overflow-hidden">
      {/* Dégradé chaud */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#5C4828_0%,#2E3A1E_100%)]" />

      {/* Lueurs / soleil */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 30%, rgba(212,175,110,0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(46,58,30,0.7) 0%, transparent 60%)
          `,
        }}
      />
      <div
        className="absolute left-[10%] top-[22%] w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full opacity-40 blur-[3px]"
        style={{
          background:
            "radial-gradient(circle, #E8D5A8 0%, #8B6F3A 60%, #3D2F18 100%)",
        }}
      />

      <OliveBranch
        className="absolute right-[4%] bottom-[18%] md:bottom-[12%] w-[160px] md:w-[240px] h-auto text-brand-cream opacity-25"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,34,24,0.30)_0%,transparent_35%,rgba(31,34,24,0.55)_100%)]" />

      {/* Contenu */}
      <div className="relative h-full mx-auto max-w-7xl flex flex-col justify-end px-6 pb-24 md:px-12 md:pb-24 text-brand-cream pt-32">
        <p className="olea-fade-up text-[11px] md:text-xs uppercase tracking-[0.25em] mb-5 md:mb-6 opacity-90">
          <span className="inline-block border-b border-brand-gold-light/60 pb-1">
            Cuisine méditerranéenne · Depuis 2019
          </span>
        </p>
        <h1 className="olea-fade-up font-serif font-normal leading-[1.02] mb-6 md:mb-7 text-[clamp(44px,8vw,92px)] tracking-[-1.5px]">
          La Méditerranée,
          <br />
          <span className="italic text-brand-gold-light">à votre table.</span>
        </h1>
        <p className="olea-fade-up font-serif italic text-lg md:text-xl leading-snug max-w-[520px] opacity-90 mb-8 md:mb-10">
          Trois maisons, un même geste : célébrer la lumière du Sud à travers
          une cuisine sincère et le partage.
        </p>

        <div className="olea-fade-up flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="#reserver"
            className="inline-flex items-center justify-center bg-brand-cream text-brand-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-gold transition-colors"
          >
            Réserver une table
          </Link>
          <Link
            href="/maisons"
            className="inline-flex items-center justify-center border border-brand-cream/70 text-brand-cream px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            Découvrir les maisons
          </Link>
        </div>

        <p className="mt-10 md:mt-0 md:absolute md:bottom-6 md:right-12 text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-brand-cream/70">
          Marseille · Cassis · Villeneuve-Loubet
        </p>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#maisons"
        aria-label="Faire défiler"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 rounded-full border border-brand-cream/40 text-brand-cream/80 hover:text-brand-cream hover:border-brand-cream transition-colors"
      >
        <ChevronDown className="h-5 w-5 olea-scroll-hint" aria-hidden />
      </a>
    </section>
  );
}
