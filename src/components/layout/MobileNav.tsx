"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { maisons } from "@/data/maisons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/maisons", label: "Nos maisons" },
  { href: "/carte", label: "La carte" },
  { href: "/privatisation", label: "Privatisation" },
  { href: "/contact", label: "Contact" },
];

type MobileNavProps = {
  transparent?: boolean;
};

export function MobileNav({ transparent }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Ouvrir le menu"
        className={cn(
          "p-2.5 -mr-1 rounded-full transition-colors",
          transparent
            ? "text-brand-cream hover:bg-brand-cream/10"
            : "text-brand-ink hover:bg-brand-ink/8",
        )}
      >
        <Menu className="h-6 w-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle className="font-serif italic text-3xl text-brand-cream mb-10">
          Oléa
        </SheetTitle>

        <nav aria-label="Navigation mobile" className="flex flex-col">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-serif text-[26px] leading-tight py-3 border-b border-brand-cream/10 transition-colors",
                    active
                      ? "text-brand-gold"
                      : "text-brand-cream hover:text-brand-gold",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <p className="text-[11px] tracking-[0.22em] uppercase text-brand-gold mb-4">
            Réserver par téléphone
          </p>
          <ul className="space-y-3">
            {maisons.map((maison) => (
              <li key={maison.slug}>
                {maison.ouvert ? (
                  <a
                    href={`tel:${maison.telephone}`}
                    className="flex items-center justify-between gap-3 text-brand-cream hover:text-brand-gold transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-serif text-lg">{maison.nom}</span>
                    <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-brand-text-soft">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {maison.telephoneAffichage}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-3 text-brand-cream/60">
                    <span className="font-serif text-lg">{maison.nom}</span>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-brand-gold">
                      Bientôt
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
