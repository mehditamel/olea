import { ChevronRight } from "lucide-react";
import { absoluteUrl, cn } from "@/lib/utils";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

type Props = {
  items: readonly BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
  ariaLabel: string;
};

export function Breadcrumbs({
  items,
  variant = "dark",
  className,
  ariaLabel,
}: Props) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  const baseColor =
    variant === "light" ? "text-brand-cream/85" : "text-brand-ink/70";
  const hoverColor =
    variant === "light" ? "hover:text-brand-gold" : "hover:text-brand-olive";

  return (
    <>
      <nav
        aria-label={ariaLabel}
        className={cn(
          "text-[10px] md:text-[11px] uppercase tracking-[0.22em]",
          baseColor,
          className,
        )}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, idx) => {
            const last = idx === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-current">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className={cn("transition-colors", hoverColor)}
                  >
                    {item.label}
                  </a>
                )}
                {!last && (
                  <ChevronRight
                    className="h-3 w-3 opacity-60 rtl:rotate-180"
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
