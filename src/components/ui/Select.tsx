import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const CHEVRON =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231F2218' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-12 w-full border border-brand-ink/20 bg-white ps-4 pe-10 py-2 text-[15px] md:text-sm font-sans text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-no-repeat bg-[right_1rem_center] hover:border-brand-ink/35 transition-colors",
        className,
      )}
      style={{ backgroundImage: CHEVRON, ...(props.style ?? {}) }}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
