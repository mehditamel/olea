import Link from "next/link";
import { maisons } from "@/data/maisons";
import { OliveBranch } from "@/components/brand/OliveBranch";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-brand-cream pt-20 pb-8 px-6 md:px-12 relative overflow-hidden">
      <OliveBranch
        className="absolute -bottom-8 -left-10 w-48 h-56 text-brand-olive-soft opacity-15 pointer-events-none"
        color="currentColor"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div>
            <p className="font-serif italic text-3xl md:text-[32px] mb-4">
              Oléa
            </p>
            <p className="text-sm leading-relaxed text-brand-text-soft max-w-[240px]">
              Une cuisine méditerranéenne authentique en Provence et Côte
              d&apos;Azur.
            </p>
          </div>
          {maisons.map((maison) => (
            <div key={maison.slug}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold mb-4">
                {maison.nom}
              </p>
              <address className="not-italic text-sm leading-relaxed text-brand-text-soft">
                {maison.adresse}
                <br />
                {maison.codePostal} {maison.ville}
                <br />
                {maison.ouvert ? (
                  <a
                    href={`tel:${maison.telephone}`}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {maison.telephoneAffichage}
                  </a>
                ) : (
                  <span className="text-brand-gold">Ouverture prochaine</span>
                )}
              </address>
              <Link
                href={`/maisons/${maison.slug}`}
                className="mt-4 inline-block text-[11px] uppercase tracking-[0.18em] border-b border-brand-gold-deep pb-1 hover:text-brand-gold transition-colors"
              >
                Découvrir →
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-7 border-t border-brand-cream/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] text-brand-gold-deep">
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="hover:text-brand-gold transition-colors"
          >
            contact@olea-restaurant.fr
          </a>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-brand-gold transition-colors">
              Mentions légales
            </Link>
            <span>© {year} Maison Oléa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
