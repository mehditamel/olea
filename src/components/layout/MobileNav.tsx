"use client";

import { useState } from "react";
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
import { LocaleLink } from "@/i18n/LocaleLink";
import { useStrippedPathname } from "@/i18n/LocaleProvider";
import { withLocale } from "@/i18n/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localizeMaison } from "@/i18n/localized-maison";

type MobileNavProps = {
  transparent?: boolean;
  lang: Locale;
  dict: Dictionary;
};

export function MobileNav({ transparent, lang, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const stripped = useStrippedPathname();

  const NAV: { href: string; label: string }[] = [
    { href: "/", label: dict.nav.accueil },
    { href: "/maisons", label: dict.nav.nosMaisons },
    { href: "/carte", label: dict.nav.laCarte },
    { href: "/reserver", label: dict.nav.reserver },
    { href: "/privatisation", label: dict.nav.privatisation },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={dict.header.ouvrirMenu}
        className={cn(
          "p-2.5 -me-1 rounded-full transition-colors",
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

        <nav aria-label={dict.header.navMobile} className="flex flex-col">
          {NAV.map((item) => {
            const active =
              stripped === item.href ||
              (item.href !== "/" && stripped.startsWith(`${item.href}/`));
            return (
              <SheetClose asChild key={item.href}>
                <LocaleLink
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
                </LocaleLink>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-8">
          <p className="text-[11px] tracking-[0.22em] uppercase text-brand-gold mb-3">
            {dict.languageSwitcher.label}
          </p>
          <LanguageSwitcher
            lang={lang}
            dict={dict}
            pathname={withLocale(lang, stripped)}
            variant="transparent"
          />
        </div>

        <div className="mt-auto pt-8">
          <p className="text-[11px] tracking-[0.22em] uppercase text-brand-gold mb-4">
            {dict.header.reserverParTel}
          </p>
          <ul className="space-y-3">
            {maisons.map((maison) => {
              const m = localizeMaison(maison, lang);
              return (
                <li key={m.slug}>
                  {m.ouvert ? (
                    <a
                      href={`tel:${m.telephone}`}
                      className="flex items-center justify-between gap-3 text-brand-cream hover:text-brand-gold transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-serif text-lg">{m.nom}</span>
                      <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-brand-text-soft">
                        <Phone className="h-3.5 w-3.5" aria-hidden />
                        {m.telephoneAffichage}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-3 text-brand-cream/60">
                      <span className="font-serif text-lg">{m.nom}</span>
                      <span className="text-[11px] tracking-[0.18em] uppercase text-brand-gold">
                        {dict.common.bientot}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
