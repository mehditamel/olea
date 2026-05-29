import { ArrowUpRight } from "lucide-react";
import { OliveBranch } from "@/components/brand/OliveBranch";
import { EngravingMotif } from "@/components/brand/EngravingMotif";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";

export function EspritSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-brand-cream px-6 md:px-12 py-16 md:py-28">
      {/* Olivier gravé — symbole fondateur de la charte, en filigrane */}
      <EngravingMotif
        motif="olive"
        className="pointer-events-none absolute -bottom-6 -start-6 h-48 w-40 text-brand-olive-soft opacity-15 md:h-60 md:w-52"
      />
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        <Reveal>
          <p className="eyebrow text-brand-olive mb-5">{dict.esprit.eyebrow}</p>
          <h2 className="font-sans font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.8px] mb-6 md:mb-7 text-brand-ink">
            {dict.esprit.titre}{" "}
            <span className="font-serif italic">{dict.esprit.titreItalic}</span>{" "}
            {dict.esprit.titreSuite}
          </h2>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-5">
            {dict.esprit.p1}
          </p>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-8">
            {dict.esprit.p2}
          </p>
          <a
            href={withLocale(lang, "/carte")}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
          >
            {dict.esprit.ctaCarte}
            <ArrowUpRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </a>
        </Reveal>
        <Reveal
          delay={120}
          dir="scale"
          className="relative h-[280px] md:h-[420px] overflow-hidden order-first md:order-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, #F4DCA9 0%, #C49960 40%, #B07D2E 100%)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 35% 40%, rgba(244,236,221,0.35) 0%, transparent 35%)",
            }}
          />
          <div className="olea-drift absolute end-4 top-4">
            <OliveBranch
              className="w-28 h-36 md:w-32 md:h-40 text-brand-olive-deep opacity-25"
              variant="left"
            />
          </div>
          <p className="absolute bottom-5 start-5 md:bottom-6 md:start-6 font-serif italic text-xs text-brand-ink opacity-70">
            {dict.esprit.caption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
