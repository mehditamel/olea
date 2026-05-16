import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full border border-brand-ink/20 bg-white px-4 py-2 text-[15px] md:text-sm font-sans text-brand-ink placeholder:text-brand-text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-brand-ink/35",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
