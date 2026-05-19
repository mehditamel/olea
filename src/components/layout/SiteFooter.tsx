import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
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
      <OliveBranch
        className="absolute -top-6 -end-12 w-36 h-44 md:w-40 md:h-48 text-brand-olive-soft opacity-10 pointer-events-none rotate-180"
        color="currentColor"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.3fr_repeat(3,1fr)] gap-12 md:gap-14 mb-14">
          <div>
            <Image
              src="/images/brand/logo.png"
              alt="Maison Oléa"
              width={800}
              height={600}
              sizes="(max-width: 768px) 56px, 72px"
              className="h-14 md:h-16 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed text-brand-text-soft max-w-[280px] mb-6 italic">
              {dict.footer.tagline}
            </p>
            <div className="h-px w-12 bg-brand-gold-deep/60 mb-5" aria-hidden />
            <ul className="flex flex-col gap-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={withLocale(lang, link.href)}
                    className="group inline-flex items-center gap-2 text-brand-text-soft hover:text-brand-gold transition-colors"
                  >
                    <span className="h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-4" aria-hidden />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {maisons.map((raw) => {
            const maison = localizeMaison(raw, lang);
            return (
              <div key={maison.slug} className="flex flex-col">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold mb-2">
                  <BrandWord /> {maison.nom}
                </p>
                <div className="h-px w-8 bg-brand-gold-deep/70 mb-4" aria-hidden />

                <address className="not-italic text-sm leading-relaxed text-brand-text-soft flex gap-2">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-brand-gold-deep" aria-hidden />
                  <span>
                    <bdi>{maison.adresse}</bdi>
                    <br />
                    <bdi>{maison.codePostal} {maison.ville}</bdi>
                  </span>
                </address>

                <div className="mt-4 flex flex-col gap-2">
                  {maison.ouvert ? (
                    <a
                      href={`tel:${maison.telephone}`}
                      className="inline-flex items-center gap-2 text-sm text-brand-text-soft hover:text-brand-gold transition-colors w-fit"
                    >
                      <Phone className="h-3.5 w-3.5 text-brand-gold-deep" aria-hidden />
                      <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-brand-gold w-fit">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {dict.footer.ouvertureProchaine}
                    </span>
                  )}

                  {maison.instagram?.url ? (
                    <a
                      href={maison.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-brand-text-soft hover:text-brand-gold transition-colors w-fit"
                      aria-label={`Instagram Maison Oléa ${maison.nom} — @${maison.instagram.handle}`}
                    >
                      <InstagramIcon className="h-3.5 w-3.5 text-brand-gold-deep" />
                      @{maison.instagram.handle}
                    </a>
                  ) : maison.instagram ? (
                    <span className="inline-flex items-center gap-2 text-sm text-brand-gold-deep w-fit">
                      <InstagramIcon className="h-3.5 w-3.5" />
                      @{maison.instagram.handle} · {dict.footer.bientot}
                    </span>
                  ) : null}
                </div>

                <a
                  href={withLocale(lang, `/maisons/${maison.slug}`)}
                  className="group mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-cream hover:text-brand-gold transition-colors w-fit"
                >
                  <span className="relative pb-1">
                    {dict.footer.decouvrir}
                    <span className="absolute inset-x-0 bottom-0 h-px bg-brand-gold-deep" aria-hidden />
                    <span className="absolute inset-x-0 bottom-0 h-px bg-brand-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" aria-hidden />
                  </span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="relative pt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-brand-gold-deep">
          <span
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold-deep/40 to-transparent"
            aria-hidden
          />
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            <bdi dir="ltr">contact@olea-restaurant.fr</bdi>
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={withLocale(lang, "/mentions-legales")}
              className="hover:text-brand-gold transition-colors"
            >
              {dict.footer.mentionsLegales}
            </a>
            <span className="h-2.5 w-px bg-brand-gold-deep/40" aria-hidden />
            <a
              href={withLocale(lang, "/cgu")}
              className="hover:text-brand-gold transition-colors"
            >
              {dict.footer.cgu}
            </a>
            <span className="h-2.5 w-px bg-brand-gold-deep/40" aria-hidden />
            <span>© {year} {dict.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
