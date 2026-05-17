"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Sparkles } from "lucide-react";
import { maisons } from "@/data/maisons";
import { googleMapsUrl } from "@/lib/maps";

export function MobileCtaBar() {
  const pathname = usePathname();

  // Pas de barre CTA sur le formulaire de devis lui-même (évite la friction)
  if (pathname?.startsWith("/privatisation")) return null;

  // Trouve la maison contextuelle si on est sur /maisons/[slug]
  const slugFromPath = pathname?.match(/^\/maisons\/([^/]+)/)?.[1];
  const contextMaison =
    slugFromPath && maisons.find((m) => m.slug === slugFromPath && m.ouvert);

  // Sinon, on tape sur la maison-mère (Marseille) qui est ouverte
  const fallback = maisons.find((m) => m.ouvert) ?? maisons[0];
  const target = contextMaison || fallback;
  if (!target) return null;

  // Sur la page d'une maison ouverte : Réserver (tel) + Itinéraire.
  // Partout ailleurs : Réserver (tel) + Devis privatisation.
  const isOnMaisonPage = Boolean(contextMaison);

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-brand-ink/95 backdrop-blur-md border-t border-brand-cream/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Actions rapides"
    >
      <div className="flex items-stretch divide-x divide-brand-cream/12">
        <a
          href={`tel:${target.telephone}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-cream active:bg-brand-olive/40 transition-colors min-h-[56px]"
        >
          <Phone className="h-4 w-4 text-brand-gold" aria-hidden />
          <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
            Réserver
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
              Itinéraire
            </span>
          </a>
        ) : (
          <Link
            href="/privatisation"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-brand-cream active:bg-brand-olive/40 transition-colors min-h-[56px]"
          >
            <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
              Devis
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
