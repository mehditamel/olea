import type { Maison } from "@/types/maison";

/**
 * Galerie placeholder pour la v1.
 * Affichée uniquement si `maison.photos.length > 0` (les photos réelles arriveront en v1.1).
 * Pour l'instant, on génère des cartes au dégradé à partir de la couleur accent.
 */
export function MaisonGallery({ maison }: { maison: Maison }) {
  if (maison.photos.length === 0) return null;

  return (
    <section className="bg-brand-ink px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-gold mb-8">Ambiance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {maison.photos.map((path, idx) => (
            <div
              key={path}
              className="aspect-[4/5]"
              role="img"
              aria-label={`Photo ${idx + 1} de la maison ${maison.nom}`}
              style={{
                background: `
                  linear-gradient(to bottom, rgba(31,34,24,0.15) 0%, rgba(31,34,24,0.7) 100%),
                  radial-gradient(ellipse at 50% 40%, ${maison.accent} 0%, rgba(31,34,24,0.5) 70%, #1F2218 100%)
                `,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
