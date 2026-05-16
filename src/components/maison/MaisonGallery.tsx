import Image from "next/image";
import type { Maison } from "@/types/maison";

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
              className="relative aspect-[4/5] overflow-hidden bg-brand-ink-soft"
            >
              <Image
                src={path}
                alt={`Maison Oléa ${maison.nom} — ambiance ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
