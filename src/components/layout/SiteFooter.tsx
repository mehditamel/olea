import { Phone, Mail } from "lucide-react";
import { maisons } from "@/data/maisons";
import { OliveBranch } from "@/components/brand/OliveBranch";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { BrandWord } from "@/components/brand/BrandWord";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

type Props = { lang: Locale; dict: Dictionary };

export function SiteFooter({ lang, dict }: Props) {
  const year = new Date().getFullYear();
  const QUICK_LINKS = [
    { href: "/maisons", label: dict.footer.nosMaisons },
    { href: "/carte", label: dict.footer.laCarte },
    { href: "/privatisation", label: dict.footer.privatisation },
    { href: "/contact", label: dict.footer.contact },
  ];

  return (
    <footer className="bg-brand-ink text-brand-cream pt-16 md:pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      <OliveBranch
        className="absolute -bottom-8 -start-10 w-44 h-52 md:w-48 md:h-56 text-brand-olive-soft opacity-15 pointer-events-none"
        color="currentColor"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.3fr_repeat(3,1fr)] gap-10 md:gap-12 mb-12">
          <div>
            <p className="font-serif italic text-3xl md:text-[32px] mb-4">
              <BrandWord />
            </p>
            <p className="text-sm leading-relaxed text-brand-text-soft max-w-[260px] mb-6">
              {dict.footer.tagline}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={withLocale(lang, link.href)}
                    className="text-brand-text-soft hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {maisons.map((raw) => {
            const maison = localizeMaison(raw, lang);
            return (
              <div key={maison.slug}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold mb-4">
                  {maison.nom}
                </p>
                <address className="not-italic text-sm leading-relaxed text-brand-text-soft">
                  <bdi>{maison.adresse}</bdi>
                  <br />
                  <bdi>{maison.codePostal} {maison.ville}</bdi>
                </address>
                <div className="mt-3">
                  {maison.ouvert ? (
                    <a
                      href={`tel:${maison.telephone}`}
                      className="inline-flex items-center gap-1.5 text-sm text-brand-text-soft hover:text-brand-gold transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                    </a>
                  ) : (
                    <span className="text-sm text-brand-gold">
                      {dict.footer.ouvertureProchaine}
                    </span>
                  )}
                </div>
                {maison.instagram?.url ? (
                  <a
                    href={maison.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-brand-text-soft hover:text-brand-gold transition-colors"
                    aria-label={`Instagram Maison Oléa ${maison.nom} — @${maison.instagram.handle}`}
                  >
                    <InstagramIcon className="h-3.5 w-3.5" />
                    @{maison.instagram.handle}
                  </a>
                ) : maison.instagram ? (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-brand-gold-deep">
                    <InstagramIcon className="h-3.5 w-3.5" />
                    @{maison.instagram.handle} · {dict.footer.bientot}
                  </span>
                ) : null}
                <a
                  href={withLocale(lang, `/maisons/${maison.slug}`)}
                  className="mt-4 inline-block text-[11px] uppercase tracking-[0.18em] border-b border-brand-gold-deep pb-1 hover:text-brand-gold transition-colors"
                >
                  {dict.footer.decouvrir} →
                </a>
              </div>
            );
          })}
        </div>

        <div className="pt-7 border-t border-brand-cream/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-brand-gold-deep">
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-1.5 hover:text-brand-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            <bdi dir="ltr">contact@olea-restaurant.fr</bdi>
          </a>
          <div className="flex items-center gap-6">
            <a
              href={withLocale(lang, "/mentions-legales")}
              className="hover:text-brand-gold transition-colors"
            >
              {dict.footer.mentionsLegales}
            </a>
            <span>© {year} {dict.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
