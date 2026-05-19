import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "olea-focus-glow flex min-h-[120px] w-full border border-brand-ink/20 bg-white px-4 py-3 text-[15px] md:text-sm font-sans text-brand-ink placeholder:text-brand-text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream disabled:cursor-not-allowed disabled:opacity-50 transition-[border-color,box-shadow] duration-200 hover:border-brand-ink/35 focus-visible:border-brand-olive resize-y",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
