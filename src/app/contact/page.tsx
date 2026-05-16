import type { Metadata } from "next";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maison Oléa à Marseille, Cassis ou Villeneuve-Loubet, ou écrivez-nous à contact@olea-restaurant.fr.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-gold mb-5">Contact</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Écrivez-nous,{" "}
            <span className="italic text-brand-gold-light">
              passez nous voir.
            </span>
          </h1>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-16">
          {maisons.map((maison) => (
            <div key={maison.slug}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-olive mb-4">
                {maison.nom}
              </p>
              <address className="not-italic text-brand-ink text-[15px] leading-[1.85]">
                {maison.adresse}
                <br />
                {maison.codePostal} {maison.ville}
              </address>
              <div className="mt-4">
                {maison.ouvert ? (
                  <a
                    href={`tel:${maison.telephone}`}
                    className="font-serif text-xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
                  >
                    {maison.telephoneAffichage}
                  </a>
                ) : (
                  <span className="font-serif italic text-lg text-brand-olive">
                    Ouverture prochaine
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-ink/15 pt-12 text-center">
          <p className="eyebrow text-brand-olive mb-4">Une question générale ?</p>
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="font-serif text-3xl md:text-4xl text-brand-ink border-b border-brand-olive pb-2 hover:text-brand-olive transition-colors"
          >
            contact@olea-restaurant.fr
          </a>
        </div>
      </section>
    </>
  );
}
