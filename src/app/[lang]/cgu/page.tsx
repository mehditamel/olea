import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CguContent } from "@/components/legal/CguContent";
import {
  LOCALES,
  type Locale,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const path = "/cgu";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: "Conditions Générales d'Utilisation",
    description:
      "Conditions Générales d'Utilisation du site Maison Oléa : usage du site, statut des demandes de réservation et devis, propriété intellectuelle, responsabilité.",
    alternates: { canonical, languages: alternates },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Conditions Générales d'Utilisation — Maison Oléa",
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
    },
  };
}

export default async function CguPage({
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
              { href: withLocale(l, "/cgu"), label: dict.footer.cgu },
            ]}
          />
          <p
            className="eyebrow text-brand-gold mb-5"
            lang="fr"
          >
            Conditions d&apos;utilisation
          </p>
          <h1
            className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl"
            lang="fr"
          >
            Conditions générales{" "}
            <span className="font-serif italic text-brand-gold-light">
              d&apos;utilisation.
            </span>
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-80" lang="fr">
            Dernière mise à jour : 17 mai 2026.
          </p>
        </div>
      </section>

      <CguContent l={l} />
    </>
  );
}
