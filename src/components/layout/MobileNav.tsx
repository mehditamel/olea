"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";

const NAV = [
  { href: "/maisons", label: "Maisons" },
  { href: "/carte", label: "Carte" },
  { href: "/reserver", label: "Réserver" },
  { href: "/privatisation", label: "Privatisation" },
  { href: "/contact", label: "Contact" },
];

type MobileNavProps = {
  triggerClassName?: string;
};

export function MobileNav({ triggerClassName }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Ouvrir le menu"
        className={triggerClassName ?? "p-2 -mr-2"}
      >
        <Menu className="h-6 w-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="font-serif italic text-3xl text-brand-cream mb-12">
          Oléa
        </SheetTitle>
        <nav className="flex flex-col gap-7">
          {NAV.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="font-serif text-2xl text-brand-cream hover:text-brand-gold transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="absolute bottom-8 left-8 right-8 pt-6 border-t border-brand-cream/15">
          <p className="text-[11px] tracking-[0.2em] uppercase text-brand-gold mb-3">
            Réserver
          </p>
          <a
            href="tel:+33625151333"
            className="font-serif text-xl text-brand-cream hover:text-brand-gold transition-colors"
          >
            06 25 15 13 33
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
