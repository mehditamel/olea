import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
  const dict = await getDictionary(lang);
  const path = "/carte";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.carte.metaTitle,
    description: dict.carte.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: dict.carte.metaTitle,
      description: dict.carte.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

export default async function CartePage({
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
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            ariaLabel={dict.breadcrumbs.aria}
            items={[
              { href: withLocale(l, "/"), label: dict.maisonPage.accueil },
              { href: withLocale(l, "/carte"), label: dict.nav.carte },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">{dict.carte.eyebrow}</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {dict.carte.titre}{" "}
            <span className="italic text-brand-gold-light">
              {dict.carte.titreItalic}
            </span>{" "}
            {dict.carte.titreSuite}
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            {dict.carte.sousTitre}
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-brand-olive mb-8 text-center">
            {dict.carte.suggestionsEyebrow}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {dict.carte.items.map((dish) => (
              <li key={dish.titre} className="border-b border-brand-ink/10 pb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold-deep mb-2">
                  {dish.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-[26px] text-brand-ink mb-2">
                  {dish.titre}
                </h2>
                <p className="text-[15px] leading-[1.75] text-brand-text-muted">
                  {dish.texte}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 md:mt-20 text-center border-t border-brand-ink/15 pt-12">
            <p className="font-serif italic text-xl md:text-2xl text-brand-text-muted mb-7 max-w-2xl mx-auto">
              {dict.carte.saisons}
            </p>
            <a
              href={withLocale(l, "/contact")}
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              {dict.carte.ctaContact}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
