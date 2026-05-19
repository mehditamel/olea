import type { Metadata } from "next";
import { getMaisonBySlug } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import {
  LOCALES,
  type Locale,
  localeOgCode,
  localeHtmlLang,
} from "@/i18n/config";
import { hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";
import type { MaisonSlug } from "@/types/maison";

export async function maisonMetadata(
  slug: MaisonSlug,
  params: Promise<{ lang: string }>,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const raw = getMaisonBySlug(slug);
  if (!raw) return {};
  const m = localizeMaison(raw, lang as Locale);
  const path = `/maisons/${slug}`;
  const canonical = absoluteUrl(withLocale(lang as Locale, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: `${m.nom}`,
    description: m.description,
    alternates: { canonical, languages: alternates },
    openGraph: {
      title: `Maison Oléa ${m.nom}`,
      description: m.description,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang as Locale),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
      images: m.photoHero
        ? [
            {
              url: absoluteUrl(m.photoHero),
              alt: `Maison Oléa ${m.nom}`,
            },
          ]
        : undefined,
    },
  };
}
