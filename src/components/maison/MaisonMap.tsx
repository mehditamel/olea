import { MapPin, ExternalLink } from "lucide-react";
import { googleMapsUrl, osmEmbedUrl } from "@/lib/maps";
import type { Maison } from "@/types/maison";

export function MaisonMap({ maison }: { maison: Maison }) {
  return (
    <section className="bg-brand-cream px-6 md:px-12 pb-14 md:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="eyebrow text-brand-olive mb-2">Carte</p>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-ink">
              Comment venir
            </h2>
          </div>
          <a
            href={googleMapsUrl(maison)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-brand-olive hover:text-brand-olive-deep transition-colors"
          >
            Ouvrir dans Google Maps
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
        <div className="relative h-[280px] md:h-[400px] overflow-hidden border border-brand-ink/15 bg-white">
          <iframe
            title={`Carte de Maison Oléa ${maison.nom}`}
            src={osmEmbedUrl(maison)}
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        </div>
        <a
          href={googleMapsUrl(maison)}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          Itinéraire Google Maps
        </a>
      </div>
    </section>
  );
}
