import { Leaf, ChefHat, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Pillar = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};

const PILLARS: readonly Pillar[] = [
  {
    Icon: Leaf,
    title: "Produits frais & locaux",
    text: "Le savoir-faire des producteurs régionaux à chaque assiette.",
  },
  {
    Icon: ChefHat,
    title: "Fait maison",
    text: "Des plats préparés sur place, dans la tradition méditerranéenne.",
  },
  {
    Icon: Users,
    title: "Partage & convivialité",
    text: "Une table pensée pour les moments à plusieurs, en famille ou entre amis.",
  },
];

export function Pillars() {
  return (
    <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
      <ul className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 md:divide-x divide-brand-ink/10">
        {PILLARS.map(({ Icon, title, text }, idx) => (
          <li
            key={title}
            className={
              idx === 1
                ? "py-8 md:py-0 md:px-9 border-y md:border-y-0 border-brand-ink/10 text-center"
                : "py-2 md:py-0 md:px-9 text-center"
            }
          >
            <span
              className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-brand-olive/10 text-brand-olive"
              aria-hidden
            >
              <Icon className="w-6 h-6" strokeWidth={1.4} />
            </span>
            <h2 className="font-serif text-xl md:text-[22px] mb-2 text-brand-ink">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-brand-text-muted max-w-[280px] mx-auto">
              {text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
