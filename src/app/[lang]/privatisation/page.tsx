import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DevisForm } from "@/components/devis/DevisForm";
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
  const path = "/privatisation";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.privatisation.metaTitle,
    description: dict.privatisation.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: dict.privatisation.metaTitle,
      description: dict.privatisation.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

export default async function PrivatisationPage({
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
              {
                href: withLocale(l, "/privatisation"),
                label: dict.nav.privatisation,
              },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">
            {dict.privatisation.eyebrow}
          </p>
          <h1 className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {dict.privatisation.titre}{" "}
            <span className="font-serif italic text-brand-gold-light">
              {dict.privatisation.titreItalic}
            </span>
          </h1>
          <p className="mt-7 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            {dict.privatisation.sousTitre}
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-olive mb-4">
            {dict.privatisation.formEyebrow}
          </p>
          <h2 className="font-sans text-3xl md:text-4xl mb-10 text-brand-ink">
            {dict.privatisation.formTitre}
          </h2>
          <DevisForm dict={dict} />
        </div>
      </section>
    </>
  );
}
