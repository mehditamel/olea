import type { Metadata } from "next";
import { DevisForm } from "@/components/devis/DevisForm";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privatisation & événements",
  description:
    "Privatisez Maison Oléa pour vos anniversaires, mariages, séminaires et repas d'affaires. Devis sur-mesure dans nos trois maisons.",
  alternates: { canonical: absoluteUrl("/privatisation") },
};

export default function PrivatisationPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-gold mb-5">Privatisation</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Vos célébrations,{" "}
            <span className="italic text-brand-gold-light">à notre table.</span>
          </h1>
          <p className="mt-7 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            Anniversaires, repas d&apos;affaires, mariages, séminaires. Nos
            trois maisons accueillent vos événements avec des menus sur-mesure,
            dans un cadre chaleureux inspiré du Sud.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-olive mb-4">Demande de devis</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10 text-brand-ink">
            Parlez-nous de votre projet.
          </h2>
          <DevisForm />
        </div>
      </section>
    </>
  );
}
