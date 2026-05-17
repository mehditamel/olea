import type { MenuSection as MenuSectionType } from "@/data/menu";
import { DishItem } from "./DishItem";

export function MenuSection({ section }: { section: MenuSectionType }) {
  return (
    <section aria-labelledby={`section-${section.slug}`} className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <span aria-hidden className="h-px flex-1 bg-brand-ink/15" />
        <h2
          id={`section-${section.slug}`}
          className="eyebrow text-brand-gold-deep text-center"
        >
          {section.titre}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-brand-ink/15" />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {section.plats.map((dish) => (
          <DishItem key={dish.nom} dish={dish} />
        ))}
      </ul>
    </section>
  );
}
