import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { googleMapsUrl } from "@/lib/maps";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maison Oléa à Marseille, Cassis ou Villeneuve-Loubet, ou écrivez-nous à contact@olea-restaurant.fr.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/contact", label: "Contact" },
            ]}
          />
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
                  href={googleMapsUrl(maison)}
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
              {maison.instagram?.url ? (
                <a
                  href={maison.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive hover:text-brand-olive-deep transition-colors"
                  aria-label={`Instagram @${maison.instagram.handle}`}
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  @{maison.instagram.handle}
                </a>
              ) : maison.instagram ? (
                <p className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold-deep">
                  <InstagramIcon className="h-3.5 w-3.5" />
                  @{maison.instagram.handle} · bientôt
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="border-t border-brand-ink/15 pt-12 text-center">
          <p className="eyebrow text-brand-olive mb-4">Une question générale ?</p>
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-3 font-serif text-xl sm:text-2xl md:text-4xl text-brand-ink border-b border-brand-olive pb-2 hover:text-brand-olive transition-colors break-all md:break-normal"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 flex-shrink-0" aria-hidden />
            <span>contact@olea-restaurant.fr</span>
          </a>
        </div>
      </section>
    </>
  );
}
