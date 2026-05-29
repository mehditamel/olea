import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import type { Maison } from "@/types/maison";
import type { Dictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/format";

const PREVIEW_COUNT = 6;

export function MaisonInstagram({
  maison,
  dict,
}: {
  maison: Maison;
  dict: Dictionary;
}) {
  const ig = maison.instagram;
  if (!ig) return null;

  const isComingSoon = !ig.url;
  const previews = ig.url ? maison.photos.slice(0, PREVIEW_COUNT) : [];
  const hasPreviews = previews.length > 0;

  return (
    <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-brand-olive mb-3">Instagram</p>
              <h2 className="font-sans text-3xl md:text-4xl text-brand-ink">
                {isComingSoon
                  ? dict.maisonInstagram.bientotEntete
                  : interpolate(dict.maisonInstagram.suivreEntete, {
                      nom: maison.nom,
                    })}
              </h2>
              <p className="mt-3 font-serif italic text-lg text-brand-text-muted max-w-xl">
                {isComingSoon
                  ? dict.maisonInstagram.bientotItalic
                  : dict.maisonInstagram.actifItalic}
              </p>
            </div>
            {ig.url ? (
              <a
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start md:self-auto bg-brand-ink text-brand-cream px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-brand-olive transition-colors"
                aria-label={interpolate(dict.maisonInstagram.ariaOuvrir, {
                  handle: ig.handle,
                })}
              >
                <InstagramIcon className="h-4 w-4" />
                @{ig.handle}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 self-start md:self-auto border border-brand-olive/40 text-brand-olive px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium">
                <InstagramIcon className="h-4 w-4" />
                {interpolate(dict.maisonInstagram.bientotChip, {
                  handle: ig.handle,
                })}
              </span>
            )}
          </div>
        </Reveal>

        {hasPreviews && ig.url && (
          <a
            href={ig.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={interpolate(dict.maisonInstagram.ariaVoirTout, {
              handle: ig.handle,
            })}
            className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-olive"
          >
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {previews.map((path, idx) => (
                <Reveal
                  key={path}
                  delay={idx * 60}
                  className="aspect-square relative overflow-hidden bg-brand-ink-soft"
                >
                  <Image
                    src={path}
                    alt={interpolate(dict.maisonInstagram.aperçuAlt, {
                      nom: maison.nom,
                      n: idx + 1,
                    })}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors" />
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 group-hover:text-brand-olive-deep transition-colors">
              <InstagramIcon className="h-3.5 w-3.5" />
              {dict.maisonInstagram.voirPlus}
            </p>
          </a>
        )}
      </div>
    </section>
  );
}
