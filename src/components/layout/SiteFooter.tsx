import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { maisons } from "@/data/maisons";
import { OliveBranch } from "@/components/brand/OliveBranch";
import { InstagramIcon } from "@/components/brand/InstagramIcon";

const QUICK_LINKS = [
  { href: "/maisons", label: "Nos maisons" },
  { href: "/carte", label: "La carte" },
  { href: "/privatisation", label: "Privatisation" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-brand-cream pt-16 md:pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      <OliveBranch
        className="absolute -bottom-8 -left-10 w-44 h-52 md:w-48 md:h-56 text-brand-olive-soft opacity-15 pointer-events-none"
        color="currentColor"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.3fr_repeat(3,1fr)] gap-10 md:gap-12 mb-12">
          <div>
            <Image
              src="/images/brand/logo.png"
              alt="Maison Oléa"
              width={800}
              height={600}
              sizes="(max-width: 768px) 56px, 72px"
              className="h-14 md:h-16 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-brand-text-soft max-w-[260px] mb-6">
              Une cuisine méditerranéenne authentique en Provence et Côte
              d&apos;Azur.
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-text-soft hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {maisons.map((maison) => (
            <div key={maison.slug}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold mb-4">
                Oléa {maison.nom}
              </p>
              <address className="not-italic text-sm leading-relaxed text-brand-text-soft">
                {maison.adresse}
                <br />
                {maison.codePostal} {maison.ville}
              </address>
              <div className="mt-3">
                {maison.ouvert ? (
                  <a
                    href={`tel:${maison.telephone}`}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-text-soft hover:text-brand-gold transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    {maison.telephoneAffichage}
                  </a>
                ) : (
                  <span className="text-sm text-brand-gold">Ouverture prochaine</span>
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
                  @{maison.instagram.handle} · bientôt
                </span>
              ) : null}
              <Link
                href={`/maisons/${maison.slug}`}
                className="mt-4 inline-block text-[11px] uppercase tracking-[0.18em] border-b border-brand-gold-deep pb-1 hover:text-brand-gold transition-colors"
              >
                Découvrir →
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-7 border-t border-brand-cream/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-brand-gold-deep">
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-1.5 hover:text-brand-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            contact@olea-restaurant.fr
          </a>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-brand-gold transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgu" className="hover:text-brand-gold transition-colors">
              CGU
            </Link>
            <span>© {year} Maison Oléa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
