import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { MaisonsGrid } from "@/components/home/MaisonsGrid";
import { EspritSection } from "@/components/home/EspritSection";
import { PrivatReservSection } from "@/components/home/PrivatReservSection";
import { absoluteUrl } from "@/lib/utils";
import { LOCALES, localeHtmlLang, localeOgCode } from "@/i18n/config";
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
  const path = "/";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Pillars dict={dict} />
      <MaisonsGrid lang={lang} dict={dict} />
      <EspritSection lang={lang} dict={dict} />
      <PrivatReservSection lang={lang} dict={dict} />
    </>
  );
}
