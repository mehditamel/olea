import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[11px] tracking-[0.18em] uppercase font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream",
  {
    variants: {
      variant: {
        light:
          "bg-brand-cream text-brand-ink hover:bg-brand-ink hover:text-brand-cream",
        dark: "bg-brand-ink text-brand-cream hover:bg-brand-olive",
        olive:
          "bg-brand-olive text-brand-cream hover:bg-brand-olive-deep",
        ghost:
          "bg-transparent text-brand-ink border-b border-brand-gold-deep pb-1 px-0",
        outline:
          "border border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-ink",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-7",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
