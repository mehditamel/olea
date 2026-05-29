import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMaisonBySlug } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl } from "@/lib/utils";
import { CarteHero } from "@/components/carte/CarteHero";
import { VilleneuveCoastIllustration } from "@/components/brand/illustrations/VilleneuveCoastIllustration";
import {
  LOCALES,
  type Locale,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

const SLUG = "villeneuve-loubet" as const;

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
  return {
    title: `Carte ${maison.nom} — Maison Oléa`,
    description:
      "La carte de Maison Oléa Villeneuve-Loubet sera dévoilée à l'ouverture, entre mer et arrière-pays niçois.",
    alternates: { canonical, languages: alternates },
    robots: { index: false, follow: true },
    openGraph: {
      title: `Carte Maison Oléa ${maison.nom}`,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
    },
  };
}

export default async function CarteVilleneuveLoubetPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const l: Locale = lang;
  const maison = localizeMaison(getMaisonBySlug(SLUG)!, l);
  const menu = getMenuBySlug(SLUG);

  return (
    <>
      <CarteHero
        eyebrow={dict.carte.eyebrow}
        title={
          <>
            {maison.nom},{" "}
            <span className="font-serif italic text-brand-gold-light">
              {dict.maisons.bientot.toLowerCase()}
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
        badge={dict.maisons.bientot}
        illustration={<VilleneuveCoastIllustration className="h-full w-full" />}
      />

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-olive mb-6">
            {dict.maisonReservation.fermeeEyebrow}
          </p>
          <h2 className="font-sans text-3xl md:text-4xl text-brand-ink mb-6">
            {dict.maisonReservation.fermeeTitre}
          </h2>
          <p
            className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-10"
            lang="fr"
          >
            Notre cheffe imagine en ce moment une carte azuréenne, fidèle à
            l&apos;esprit Oléa : produits de saison, simplicité méditerranéenne
            et saveurs partagées. Nous la dévoilerons ici dès l&apos;ouverture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={withLocale(l, `/maisons/${SLUG}`)}
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              {dict.maisons.decouvrir}
            </a>
            <a
              href={withLocale(l, "/contact")}
              className="inline-flex items-center justify-center border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
            >
              {dict.maisonReservation.fermeeCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
