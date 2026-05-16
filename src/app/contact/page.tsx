import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import type { Maison } from "@/types/maison";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maison Oléa à Marseille, Cassis ou Villeneuve-Loubet, ou écrivez-nous à contact@olea-restaurant.fr.",
  alternates: { canonical: absoluteUrl("/contact") },
};

function mapsUrl(maison: Maison): string {
  const q = encodeURIComponent(
    `Maison Oléa ${maison.nom}, ${maison.adresse}, ${maison.codePostal} ${maison.ville}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
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

      <section className="bg-brand-cream px-6 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {maisons.map((maison) => (
            <article
              key={maison.slug}
              className="border-t border-brand-ink/15 pt-6 md:pt-7"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-olive mb-3">
                {maison.label}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mb-4">
                {maison.nom}
              </h2>
              <address className="not-italic text-brand-ink text-[15px] leading-[1.75] mb-4">
                <a
                  href={mapsUrl(maison)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-brand-olive transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-brand-olive" aria-hidden />
                  <span>
                    {maison.adresse}
                    <br />
                    {maison.codePostal} {maison.ville}
                  </span>
                </a>
              </address>
              {maison.ouvert ? (
                <a
                  href={`tel:${maison.telephone}`}
                  className="inline-flex items-center gap-2 font-serif text-xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {maison.telephoneAffichage}
                </a>
              ) : (
                <span className="font-serif italic text-lg text-brand-olive">
                  Ouverture prochaine
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="border-t border-brand-ink/15 pt-12 text-center">
          <p className="eyebrow text-brand-olive mb-4">Une question générale ?</p>
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-3 font-serif text-2xl md:text-4xl text-brand-ink border-b border-brand-olive pb-2 hover:text-brand-olive transition-colors break-all md:break-normal"
          >
            <Mail className="h-6 w-6 md:h-7 md:w-7 flex-shrink-0" aria-hidden />
            <span>contact@olea-restaurant.fr</span>
          </a>
        </div>
      </section>
    </>
  );
}
