import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OliveBranch } from "@/components/brand/OliveBranch";
import { Reveal } from "@/components/ui/Reveal";

export function EspritSection() {
  return (
    <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-28">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        <Reveal>
          <p className="eyebrow text-brand-olive mb-5">L&apos;esprit Oléa</p>
          <h2 className="font-serif font-normal text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.8px] mb-6 md:mb-7 text-brand-ink">
            Une cuisine née du{" "}
            <span className="italic">soleil</span> et de la terre.
          </h2>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-5">
            Inspiré du mot latin désignant l&apos;olivier, Oléa célèbre la
            Provence à travers sa gastronomie. Nos plats font la part belle aux
            produits frais et locaux, mettant en avant le savoir-faire des
            producteurs de la région.
          </p>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-8">
            Tapenade, poissons grillés, légumes du soleil, huile d&apos;olive
            AOP — chaque assiette raconte la même histoire : celle du partage
            et de la lumière du Sud.
          </p>
          <Link
            href="/carte"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
          >
            Découvrir la carte
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
        <Reveal
          delay={120}
          className="relative h-[280px] md:h-[420px] overflow-hidden order-first md:order-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, #E8D5A8 0%, #C49960 40%, #8B6F3A 100%)",
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
          <OliveBranch
            className="absolute right-4 top-4 w-28 h-36 md:w-32 md:h-40 text-brand-olive-deep opacity-25"
            variant="left"
          />
          <p className="absolute bottom-5 left-5 md:bottom-6 md:left-6 font-serif italic text-xs text-brand-ink opacity-70">
            Huile d&apos;olive vierge extra · Récolte 2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
