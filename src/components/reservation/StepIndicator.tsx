import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  current: 1 | 2;
  labels: [string, string];
  ariaLabel: string;
};

export function StepIndicator({ current, labels, ariaLabel }: StepIndicatorProps) {
  return (
    <ol
      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] mb-8"
      aria-label={ariaLabel}
    >
      {labels.map((label, idx) => {
        const step = (idx + 1) as 1 | 2;
        const active = step === current;
        const done = step < current;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border text-[12px] font-medium",
                active && "bg-brand-ink text-brand-cream border-brand-ink",
                done && "bg-brand-olive text-brand-cream border-brand-olive",
                !active && !done && "border-brand-ink/30 text-brand-ink/50",
              )}
              aria-current={active ? "step" : undefined}
            >
              {step}
            </span>
            <span
              className={cn(
                active ? "text-brand-ink" : "text-brand-ink/50",
              )}
            >
              {label}
            </span>
            {idx === 0 && (
              <span
                aria-hidden
                className={cn(
                  "ms-1 h-px w-8 md:w-12",
                  done ? "bg-brand-olive" : "bg-brand-ink/20",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
