import { Leaf, ChefHat, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

type Pillar = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};

export function Pillars({ dict }: { dict: Dictionary }) {
  const PILLARS: readonly Pillar[] = [
    {
      Icon: Leaf,
      title: dict.pillars.produits.titre,
      text: dict.pillars.produits.texte,
    },
    {
      Icon: ChefHat,
      title: dict.pillars.faitMaison.titre,
      text: dict.pillars.faitMaison.texte,
    },
    {
      Icon: Users,
      title: dict.pillars.partage.titre,
      text: dict.pillars.partage.texte,
    },
  ];

  return (
    <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
      <ul className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 md:divide-x divide-brand-ink/10">
        {PILLARS.map(({ Icon, title, text }, idx) => (
          <Reveal
            as="li"
            key={title}
            delay={idx * 120}
            className={
              (idx === 1
                ? "py-8 md:py-0 md:px-9 border-y md:border-y-0 border-brand-ink/10 text-center"
                : "py-2 md:py-0 md:px-9 text-center") +
              " group/pillar"
            }
          >
            <span
              className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand-olive/10 text-brand-olive scale-90 opacity-0 transition-[transform,opacity,background-color,color] duration-500 ease-out group-data-[revealed]/pillar:scale-100 group-data-[revealed]/pillar:opacity-100 group-hover/pillar:bg-brand-olive/15 group-hover/pillar:text-brand-olive-deep"
              style={{ transitionDelay: `${idx * 120 + 200}ms` }}
              aria-hidden
            >
              <Icon
                className="w-6 h-6 transition-transform duration-300 ease-out group-hover/pillar:-rotate-[4deg]"
                strokeWidth={1.4}
              />
            </span>
            <h2 className="font-serif text-xl md:text-[22px] mb-2 text-brand-ink">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-brand-text-muted max-w-[280px] mx-auto">
              {text}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
