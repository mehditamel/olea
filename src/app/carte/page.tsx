import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Carte",
  description:
    "La carte Maison Oléa : une cuisine méditerranéenne née du soleil et de la terre. Tapenade, poissons grillés, légumes du soleil. Détails à venir.",
  alternates: { canonical: absoluteUrl("/carte") },
};

const SUGGESTIONS = [
  {
    eyebrow: "En entrée",
    title: "Tapenade & légumes croquants",
    text: "Olives noires de Nyons, anchois, câpres, huile d'olive AOP, crudités du marché.",
  },
  {
    eyebrow: "Du soleil",
    title: "Poisson du jour grillé",
    text: "Selon la pêche locale, fenouil rôti, citron confit, herbes de Provence.",
  },
  {
    eyebrow: "Plat signature",
    title: "Loup en croûte de sel",
    text: "Présenté en salle, accompagné d'une émulsion d'huile d'olive et estragon.",
  },
  {
    eyebrow: "Pour finir",
    title: "Tarte fine au miel & figues",
    text: "Pâte sablée maison, figues rôties, miel de lavande, glace huile d'olive.",
  },
];

export default function CartePage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/carte", label: "Carte" },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">La carte</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Une cuisine née du{" "}
            <span className="italic text-brand-gold-light">soleil</span> et de la terre.
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            Notre carte complète sera dévoilée ici très prochainement. En attendant,
            voici quelques suggestions du moment.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-brand-olive mb-8 text-center">
            Quelques suggestions
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {SUGGESTIONS.map((dish) => (
              <li key={dish.title} className="border-b border-brand-ink/10 pb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold-deep mb-2">
                  {dish.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-[26px] text-brand-ink mb-2">
                  {dish.title}
                </h2>
                <p className="text-[15px] leading-[1.75] text-brand-text-muted">
                  {dish.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 md:mt-20 text-center border-t border-brand-ink/15 pt-12">
            <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-7 max-w-2xl mx-auto">
              La carte évolue au gré des saisons et des arrivages.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
