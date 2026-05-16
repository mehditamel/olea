import Image from "next/image";
import type { Maison } from "@/types/maison";

export function MaisonGallery({ maison }: { maison: Maison }) {
  if (maison.photos.length === 0) return null;

  return (
    <section className="bg-brand-ink px-6 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-gold mb-8">Ambiance</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {maison.photos.map((path, idx) => (
            <div
              key={path}
              className={`relative overflow-hidden bg-brand-ink-soft group ${
                idx === 0 ? "col-span-2 md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={path}
                alt={`Maison Oléa ${maison.nom} — ambiance ${idx + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
