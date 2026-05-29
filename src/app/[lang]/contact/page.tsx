import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { googleMapsUrl } from "@/lib/maps";
import {
  LOCALES,
  type Locale,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";
import { interpolate } from "@/i18n/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const path = "/contact";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const l: Locale = lang;

  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            ariaLabel={dict.breadcrumbs.aria}
            items={[
              { href: withLocale(l, "/"), label: dict.maisonPage.accueil },
              { href: withLocale(l, "/contact"), label: dict.nav.contact },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">{dict.contact.eyebrow}</p>
          <h1 className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {dict.contact.titre}{" "}
            <span className="font-serif italic text-brand-gold-light">
              {dict.contact.titreItalic}
            </span>
          </h1>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {maisons.map((raw) => {
            const maison = localizeMaison(raw, l);
            return (
              <article
                key={maison.slug}
                className="border-t border-brand-ink/15 pt-6 md:pt-7"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-olive mb-3">
                  {maison.label}
                </p>
                <h2 className="font-sans text-2xl md:text-3xl text-brand-ink mb-4">
                  {maison.nom}
                </h2>
                <address className="not-italic text-brand-ink text-[15px] leading-[1.75] mb-4">
                  <a
                    href={googleMapsUrl(maison)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-brand-olive transition-colors"
                  >
                    <MapPin
                      className="h-4 w-4 mt-1 flex-shrink-0 text-brand-olive"
                      aria-hidden
                    />
                    <span>
                      <bdi>{maison.adresse}</bdi>
                      <br />
                      <bdi>{maison.codePostal} {maison.ville}</bdi>
                    </span>
                  </a>
                </address>
                {maison.ouvert ? (
                  <a
                    href={`tel:${maison.telephone}`}
                    className="inline-flex items-center gap-2 font-sans text-xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                  </a>
                ) : (
                  <span className="font-serif italic text-lg text-brand-olive">
                    {dict.contact.ouvertureProchaine}
                  </span>
                )}
                {maison.instagram?.url ? (
                  <a
                    href={maison.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-olive hover:text-brand-olive-deep transition-colors"
                    aria-label={interpolate(dict.maisonInfos.instagramAria, {
                      handle: maison.instagram.handle,
                    })}
                  >
                    <InstagramIcon className="h-3.5 w-3.5" />
                    @{maison.instagram.handle}
                  </a>
                ) : maison.instagram ? (
                  <p className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-gold-deep">
                    <InstagramIcon className="h-3.5 w-3.5" />
                    @{maison.instagram.handle} · {dict.contact.bientot}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="border-t border-brand-ink/15 pt-12 text-center">
          <p className="eyebrow text-brand-olive mb-4">
            {dict.contact.question}
          </p>
          <a
            href="mailto:contact@olea-restaurant.fr"
            className="inline-flex items-center gap-3 font-sans text-xl sm:text-2xl md:text-4xl text-brand-ink border-b border-brand-olive pb-2 hover:text-brand-olive transition-colors break-all md:break-normal"
          >
            <Mail
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 flex-shrink-0"
              aria-hidden
            />
            <bdi dir="ltr">contact@olea-restaurant.fr</bdi>
          </a>
        </div>
      </section>
    </>
  );
}
