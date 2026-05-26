"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-brand-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  side?: "right" | "left";
};

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      style={{ paddingTop: "max(2rem, env(safe-area-inset-top))" }}
      className={cn(
        "fixed z-50 h-full w-3/4 max-w-sm bg-brand-ink text-brand-cream p-8 shadow-lg transition ease-in-out data-[state=open]:duration-300 data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        side === "right"
          ? "end-0 top-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          : "start-0 top-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
        className="absolute end-3 p-2.5 rounded-full text-brand-cream opacity-80 hover:opacity-100 hover:bg-brand-cream/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
      >
        <X className="h-5 w-5" aria-hidden />
        <span className="sr-only">Fermer</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
