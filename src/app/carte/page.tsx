import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carte",
  description:
    "La carte Maison Oléa : une cuisine méditerranéenne née du soleil et de la terre. Détails à venir.",
  alternates: { canonical: absoluteUrl("/carte") },
};

export default function CartePage() {
  return (
    <section className="bg-brand-cream px-6 md:px-12 pt-40 pb-24 md:pt-48 md:pb-32 min-h-[70vh]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-brand-olive mb-5">La carte</p>
        <h1 className="font-serif font-normal text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-[-0.8px] mb-7 text-brand-ink">
          Une cuisine née du{" "}
          <span className="italic">soleil</span> et de la terre.
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-10">
          Notre carte complète sera dévoilée ici très prochainement.
        </p>
        <p className="text-sm leading-relaxed text-brand-ink/80 max-w-xl mx-auto">
          En attendant, pour découvrir nos suggestions du moment, contactez la
          maison de votre choix — nos équipes se feront un plaisir de vous
          renseigner.
        </p>
      </div>
    </section>
  );
}
