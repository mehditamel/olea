import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { getMaisonBySlug } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl } from "@/lib/utils";
import { CarteHero } from "@/components/carte/CarteHero";
import { MenuSection } from "@/components/carte/MenuSection";
import { MenuJsonLd } from "@/components/seo/MenuJsonLd";
import { MarseillePortIllustration } from "@/components/brand/illustrations/MarseillePortIllustration";
import {
  LOCALES,
  type Locale,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

const SLUG = "marseille" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const path = `/carte/${SLUG}`;
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  const maison = localizeMaison(getMaisonBySlug(SLUG)!, lang);
  const menu = getMenuBySlug(SLUG);
  return {
    title: `Carte ${maison.nom} — Maison Oléa`,
    description: menu.intro,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: `Carte Maison Oléa ${maison.nom}`,
      description: menu.intro,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
    },
  };
}

export default async function CarteMarseillePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const l: Locale = lang;
  const maison = localizeMaison(getMaisonBySlug(SLUG)!, l);
  const rawMaison = getMaisonBySlug(SLUG)!;
  const menu = getMenuBySlug(SLUG);

  return (
    <>
      <MenuJsonLd maison={rawMaison} menu={menu} />
      <CarteHero
        eyebrow={dict.carte.eyebrow}
        title={
          <>
            {maison.nom},{" "}
            <span className="italic text-brand-gold-light">
              face au port
            </span>
            .
          </>
        }
        baseline={menu.intro}
        breadcrumbs={[
          { href: withLocale(l, "/"), label: dict.maisonPage.accueil },
          { href: withLocale(l, "/carte"), label: dict.nav.carte },
          { href: withLocale(l, `/carte/${SLUG}`), label: maison.nom },
        ]}
        breadcrumbsAriaLabel={dict.breadcrumbs.aria}
        illustration={<MarseillePortIllustration className="h-full w-full" />}
      />

      <section
        className="bg-brand-cream px-6 md:px-12 py-14 md:py-20"
        lang="fr"
      >
        <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
          {menu.sections.map((section) => (
            <MenuSection key={section.slug} section={section} />
          ))}

          <div className="border-t border-brand-ink/15 pt-12 text-center">
            <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-7 max-w-2xl mx-auto">
              La carte évolue au gré des saisons et des arrivages du Vieux-Port.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${rawMaison.telephone}`}
                className="inline-flex items-center gap-2 bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span lang={l}>{dict.cta.reserver}</span>
                {" — "}
                <bdi dir="ltr">{rawMaison.telephoneAffichage}</bdi>
              </a>
              <a
                href={withLocale(l, `/maisons/${SLUG}`)}
                className="inline-flex items-center justify-center border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
              >
                <span lang={l}>{dict.maisons.decouvrir}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
