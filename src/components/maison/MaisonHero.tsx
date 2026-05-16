import Image from "next/image";
import { OliveBranch } from "@/components/brand/OliveBranch";
import type { Maison } from "@/types/maison";

export function MaisonHero({ maison }: { maison: Maison }) {
  const featured = Boolean(maison.badgeOuverture);
  const hasPhoto = maison.photoHero.length > 0;
  return (
    <section
      className="relative h-[68vh] min-h-[480px] overflow-hidden"
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
            ? "linear-gradient(to bottom, rgba(31,34,24,0.15) 0%, rgba(31,34,24,0.75) 100%)"
            : `
              linear-gradient(to bottom, rgba(31,34,24,0.2) 0%, rgba(31,34,24,0.7) 100%),
              radial-gradient(ellipse at 50% 40%, ${maison.accent} 0%, rgba(31,34,24,0.5) 60%, #1F2218 100%)
            `,
        }}
      />
      <OliveBranch
        className="absolute right-[4%] bottom-[8%] w-[160px] md:w-[220px] h-auto text-brand-cream opacity-20"
      />
      <div className="relative h-full mx-auto max-w-7xl flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-16 text-brand-cream pt-32">
        <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-4">
          {maison.label}
        </p>
        <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-none tracking-[-1px] mb-5">
          {maison.nom}
        </h1>
        <p className="font-serif italic text-lg md:text-xl max-w-[520px] opacity-90 leading-snug">
          {maison.description}
        </p>
        {featured && (
          <span className="mt-6 self-start bg-brand-gold text-brand-ink text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 font-semibold">
            {maison.badgeOuverture}
          </span>
        )}
      </div>
    </section>
  );
}
