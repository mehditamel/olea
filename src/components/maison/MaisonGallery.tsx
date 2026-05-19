"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Maison } from "@/types/maison";
import type { Dictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/format";

export function MaisonGallery({
  maison,
  dict,
}: {
  maison: Maison;
  dict: Dictionary;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const photos = maison.photos;

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setOpenIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setOpenIndex((i) =>
          i === null ? 0 : (i - 1 + photos.length) % photos.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, photos.length]);

  if (photos.length === 0) return null;

  const activeIndex = openIndex ?? 0;
  const activePath = photos[activeIndex];

  return (
    <section className="bg-brand-ink px-6 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-gold mb-8">{dict.maisonGallery.ambiance}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {photos.map((path, idx) => (
            <Reveal
              key={path}
              delay={idx * 60}
              className={
                idx === 0
                  ? "col-span-2 md:col-span-2 aspect-[16/10]"
                  : "aspect-[4/5]"
              }
            >
              <button
                type="button"
                onClick={() => setOpenIndex(idx)}
                aria-label={interpolate(dict.maisonGallery.ariaAgrandir, {
                  n: idx + 1,
                  total: photos.length,
                })}
                className="relative block w-full h-full overflow-hidden bg-brand-ink-soft group cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
              >
                <Image
                  src={path}
                  alt={interpolate(dict.maisonGallery.altPhoto, {
                    nom: maison.nom,
                    n: idx + 1,
                  })}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.08]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <DialogPrimitive.Root
        open={openIndex !== null}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-brand-ink/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-300" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-300"
            onClick={() => setOpenIndex(null)}
          >
            <DialogPrimitive.Title className="sr-only">
              {interpolate(dict.maisonGallery.galerieSrTitle, {
                nom: maison.nom,
                n: activeIndex + 1,
                total: photos.length,
              })}
            </DialogPrimitive.Title>
            {activePath && (
              <div
                className="relative w-full h-full max-w-6xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={activePath}
                  src={activePath}
                  alt={interpolate(dict.maisonGallery.altPhotoLightbox, {
                    nom: maison.nom,
                    n: activeIndex + 1,
                  })}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain animate-in fade-in-0 duration-300"
                />
              </div>
            )}

            <button
              type="button"
              aria-label={dict.maisonGallery.photoPrecedente}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  i === null ? 0 : (i - 1 + photos.length) % photos.length,
                );
              }}
              className="absolute start-2 sm:start-3 md:start-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream transition-colors"
            >
              <ChevronLeft className="h-6 w-6 rtl:rotate-180" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={dict.maisonGallery.photoSuivante}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  i === null ? 0 : (i + 1) % photos.length,
                );
              }}
              className="absolute end-2 sm:end-3 md:end-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream transition-colors"
            >
              <ChevronRight className="h-6 w-6 rtl:rotate-180" aria-hidden />
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.22em] uppercase text-brand-cream/80">
              {activeIndex + 1} / {photos.length}
            </p>

            <DialogPrimitive.Close
              className="absolute top-4 end-4 md:top-6 md:end-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream transition-colors"
              aria-label={dict.maisonGallery.fermerLightbox}
            >
              <X className="h-5 w-5" aria-hidden />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
