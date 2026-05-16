import Link from "next/link";
import { maisons } from "@/data/maisons";
import type { Maison } from "@/types/maison";

function maisonMediaStyle(accent: string): React.CSSProperties {
  return {
    background: `
      linear-gradient(to bottom, rgba(31,34,24,0.1) 0%, rgba(31,34,24,0.85) 100%),
      radial-gradient(ellipse at 50% 40%, ${accent} 0%, rgba(31,34,24,0.4) 70%, #1F2218 100%)
    `,
  };
}

function MaisonCard({ maison }: { maison: Maison }) {
  const featured = Boolean(maison.badgeOuverture);
  return (
    <article
      className={`bg-brand-ink-soft flex flex-col ${featured ? "ring-1 ring-brand-gold" : ""}`}
    >
      <div
        className="relative h-[260px] md:h-[300px]"
        style={maisonMediaStyle(maison.accent)}
        role="img"
        aria-label={`Visuel évocateur de la maison ${maison.nom}`}
      >
        {featured && (
          <span className="absolute top-5 right-5 bg-brand-gold text-brand-ink text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 font-semibold">
            {maison.badgeOuverture}
          </span>
        )}
        <div className="absolute bottom-6 left-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-2">
            {maison.label}
          </p>
          <h3 className="font-serif font-normal text-[32px] md:text-4xl leading-[1.05] tracking-[-0.3px] text-brand-cream">
            {maison.nom.replace("Villeneuve-Loubet", "Villeneuve-\nLoubet")
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
          </h3>
        </div>
      </div>
      <div className="px-6 py-7 flex flex-col flex-1">
        <p className="text-xs text-brand-text-soft mb-3">
          {maison.adresse}, {maison.codePostal}
        </p>
        <p className="text-sm leading-relaxed text-brand-cream/90 mb-6 flex-1">
          {maison.description}
        </p>
        <Link
          href={`/maisons/${maison.slug}`}
          className="self-start text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-gold-light hover:border-brand-gold-light transition-colors"
        >
          {maison.ouvert ? `Découvrir ${maison.nom} →` : "En savoir plus →"}
        </Link>
      </div>
    </article>
  );
}

export function MaisonsGrid() {
  return (
    <section
      id="maisons"
      className="bg-brand-ink text-brand-cream px-6 md:px-12 py-20 md:py-28"
    >
      <header className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <p className="eyebrow text-brand-gold mb-5">Nos trois maisons</p>
        <h2 className="font-serif font-normal text-[clamp(36px,4.5vw,52px)] leading-[1.1] tracking-[-0.5px]">
          De la Provence à la{" "}
          <span className="italic text-brand-gold-light">Côte d&apos;Azur</span>
        </h2>
      </header>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
        {maisons.map((maison) => (
          <MaisonCard key={maison.slug} maison={maison} />
        ))}
      </div>
    </section>
  );
}
