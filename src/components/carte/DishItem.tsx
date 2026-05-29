import type { Dish } from "@/data/menu";
import { Reveal } from "@/components/ui/Reveal";

export function DishItem({ dish, index = 0 }: { dish: Dish; index?: number }) {
  const delay = Math.min(index * 60, 480);
  return (
    <Reveal as="li" delay={delay} className="border-b border-brand-ink/10 pb-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-sans text-xl md:text-[22px] text-brand-ink leading-snug">
          {dish.nom}
        </h3>
        {dish.prix ? (
          <span className="font-sans text-base md:text-lg text-brand-olive whitespace-nowrap">
            {dish.prix}
          </span>
        ) : null}
      </div>
      {dish.description ? (
        <p className="mt-1.5 text-[14.5px] leading-[1.65] text-brand-text-muted">
          {dish.description}
        </p>
      ) : null}
    </Reveal>
  );
}
