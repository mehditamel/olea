import type { Dish } from "@/data/menu";

export function DishItem({ dish }: { dish: Dish }) {
  return (
    <li className="border-b border-brand-ink/10 pb-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl md:text-[22px] text-brand-ink leading-snug">
          {dish.nom}
        </h3>
        {dish.prix ? (
          <span className="font-serif text-base md:text-lg text-brand-gold-deep whitespace-nowrap">
            {dish.prix}
          </span>
        ) : null}
      </div>
      {dish.description ? (
        <p className="mt-1.5 text-[14.5px] leading-[1.65] text-brand-text-muted">
          {dish.description}
        </p>
      ) : null}
    </li>
  );
}
