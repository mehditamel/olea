import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
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
  const path = "/reserver";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.reserver.metaTitle,
    description: dict.reserver.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: dict.reserver.metaTitle,
      description: dict.reserver.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ReserverPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: SearchParams;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const l: Locale = lang;

  const sp = await searchParams;
  const rawMaison = sp.maison;
  const defaultMaison = Array.isArray(rawMaison) ? rawMaison[0] : rawMaison;
  const maisonsOuvertes = maisons.filter((m) => m.ouvert);

  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-gold mb-5">{dict.reserver.eyebrow}</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {dict.reserver.titre}{" "}
            <span className="italic text-brand-gold-light">
              {dict.reserver.titreItalic}
            </span>
          </h1>
          <p className="mt-7 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            {dict.reserver.sousTitre}
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-olive mb-4">
            {dict.reserver.formEyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10 text-brand-ink">
            {dict.reserver.formTitre}
          </h2>
          <ReservationForm
            defaultMaison={defaultMaison}
            lang={l}
            dict={dict}
          />
        </div>
      </section>

      <section className="bg-brand-cream-soft px-6 md:px-12 py-14 md:py-16 border-t border-brand-ink/10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-olive mb-6 text-center">
            {dict.reserver.phoneEyebrow}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {maisonsOuvertes.map((maison) => (
              <li key={maison.slug} className="text-center">
                <p className="font-serif text-2xl text-brand-ink mb-2">
                  {maison.nom}
                </p>
                <p className="text-sm text-brand-text-muted mb-3">
                  <bdi>{maison.adresse} · {maison.ville}</bdi>
                </p>
                <a
                  href={`tel:${maison.telephone}`}
                  className="font-serif text-xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
                >
                  <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
