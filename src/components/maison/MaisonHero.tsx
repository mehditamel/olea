import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { OliveBranch } from "@/components/brand/OliveBranch";
import type { Maison } from "@/types/maison";

function mapsUrl(maison: Maison): string {
  const q = encodeURIComponent(
    `Maison Oléa ${maison.nom}, ${maison.adresse}, ${maison.codePostal} ${maison.ville}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function MaisonHero({ maison }: { maison: Maison }) {
  const featured = Boolean(maison.badgeOuverture);
  const hasPhoto = maison.photoHero.length > 0;
  return (
    <section
      className="relative min-h-[78vh] md:min-h-[560px] md:h-[72vh] overflow-hidden"
      aria-label={`Maison Oléa ${maison.nom}`}
    >
      {hasPhoto && (
        <Image
          src={maison.photoHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: hasPhoto
            ? "linear-gradient(to bottom, rgba(31,34,24,0.20) 0%, rgba(31,34,24,0.80) 100%)"
            : `
              linear-gradient(to bottom, rgba(31,34,24,0.2) 0%, rgba(31,34,24,0.7) 100%),
              radial-gradient(ellipse at 50% 40%, ${maison.accent} 0%, rgba(31,34,24,0.5) 60%, #1F2218 100%)
            `,
        }}
      />
      <OliveBranch
        className="absolute right-[4%] bottom-[8%] w-[140px] md:w-[220px] h-auto text-brand-cream opacity-20"
      />
      <div className="relative h-full mx-auto max-w-7xl flex flex-col justify-end px-6 pb-10 md:px-12 md:pb-16 text-brand-cream pt-28 md:pt-32">
        <p className="olea-fade-up text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-4">
          {maison.label}
        </p>
        <h1 className="olea-fade-up font-serif font-normal text-[clamp(40px,6.5vw,72px)] leading-[1.02] tracking-[-1px] mb-5">
          {maison.nom}
        </h1>
        <p className="olea-fade-up font-serif italic text-lg md:text-xl max-w-[560px] opacity-90 leading-snug mb-7">
          {maison.description}
        </p>

        <div className="olea-fade-up flex flex-wrap items-center gap-3">
          {maison.ouvert ? (
            <a
              href={`tel:${maison.telephone}`}
              className="inline-flex items-center gap-2 bg-brand-cream text-brand-ink px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {maison.telephoneAffichage}
            </a>
          ) : null}
          <a
            href={mapsUrl(maison)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-cream/70 text-brand-cream px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-cream hover:text-brand-ink transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Itinéraire
          </a>
          {featured && (
            <span className="bg-brand-gold text-brand-ink text-[11px] tracking-[0.2em] uppercase px-3 py-2 font-semibold">
              {maison.badgeOuverture}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
