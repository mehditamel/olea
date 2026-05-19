import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";

type Props = {
  eyebrow: string;
  title: ReactNode;
  baseline?: string;
  breadcrumbs: readonly BreadcrumbItem[];
  breadcrumbsAriaLabel: string;
  badge?: string;
  illustration: ReactNode;
};

/**
 * Hero des pages /carte/* : illustration SVG en fond, overlay sombre,
 * titre serif, baseline italique. Reproduit le rythme visuel du hero
 * /carte existant tout en laissant la place à une illustration.
 */
export function CarteHero({
  eyebrow,
  title,
  baseline,
  breadcrumbs,
  breadcrumbsAriaLabel,
  badge,
  illustration,
}: Props) {
  return (
    <section
      className="relative overflow-hidden bg-brand-ink text-brand-cream"
      aria-label={typeof title === "string" ? title : eyebrow}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
        {illustration}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,34,24,0.55) 0%, rgba(31,34,24,0.92) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-32 pb-14 md:pt-40 md:pb-20">
        <Breadcrumbs
          variant="light"
          className="mb-6"
          items={breadcrumbs}
          ariaLabel={breadcrumbsAriaLabel}
        />
        <div className="flex items-center gap-3 mb-5">
          <p className="eyebrow text-brand-gold">{eyebrow}</p>
          {badge ? (
            <span className="bg-brand-gold text-brand-ink text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-semibold">
              {badge}
            </span>
          ) : null}
        </div>
        <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
          {title}
        </h1>
        {baseline ? (
          <p className="mt-6 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            {baseline}
          </p>
        ) : null}
      </div>
    </section>
  );
}
