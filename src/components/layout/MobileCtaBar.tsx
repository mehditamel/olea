"use client";

import { MapPin, Phone, Sparkles } from "lucide-react";
import { maisons } from "@/data/maisons";
import { googleMapsUrl } from "@/lib/maps";
import { LocaleLink } from "@/i18n/LocaleLink";
import { useStrippedPathname } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

export function MobileCtaBar({ dict }: Props) {
  const pathname = useStrippedPathname();

  if (pathname.startsWith("/privatisation")) return null;

  const slugFromPath = pathname.match(/^\/maisons\/([^/]+)/)?.[1];
  const contextMaison =
    slugFromPath && maisons.find((m) => m.slug === slugFromPath && m.ouvert);

  const fallback = maisons.find((m) => m.ouvert) ?? maisons[0];
  const target = contextMaison || fallback;
  if (!target) return null;

  const isOnMaisonPage = Boolean(contextMaison);

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-brand-ink/95 backdrop-blur-md border-t border-brand-cream/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label={dict.cta.ariaActions}
    >
      <div className="flex items-stretch divide-x divide-brand-cream/12">
        <a
          href={`tel:${target.telephone}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-cream active:bg-brand-olive/40 transition-colors min-h-[56px]"
        >
          <Phone className="h-4 w-4 text-brand-gold" aria-hidden />
          <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
            {dict.cta.reserver}
          </span>
        </a>
        {isOnMaisonPage ? (
          <a
            href={googleMapsUrl(target)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-cream active:bg-brand-olive/40 transition-colors min-h-[56px]"
          >
            <MapPin className="h-4 w-4 text-brand-gold" aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
              {dict.cta.itineraire}
            </span>
          </a>
        ) : (
          <LocaleLink
            href="/privatisation"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-cream active:bg-brand-olive/40 transition-colors min-h-[56px]"
          >
            <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
              {dict.cta.devis}
            </span>
          </LocaleLink>
        )}
      </div>
    </div>
  );
}
