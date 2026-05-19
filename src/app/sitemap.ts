import type { MetadataRoute } from "next";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";
import { LOCALES, localeHtmlLang, DEFAULT_LOCALE } from "@/i18n/config";
import { withLocale } from "@/i18n/locale-href";

type Page = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_PAGES: readonly Page[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/maisons", changeFrequency: "monthly", priority: 0.9 },
  { path: "/carte", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reserver", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privatisation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cgu", changeFrequency: "yearly", priority: 0.2 },
];

const CARTE_MAISON_SLUGS = maisons
  .filter((m) => m.slug !== "villeneuve-loubet")
  .map((m) => m.slug);

function alternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) {
    map[localeHtmlLang(l)] = absoluteUrl(withLocale(l, path));
  }
  map["x-default"] = absoluteUrl(withLocale(DEFAULT_LOCALE, path));
  return map;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const lang of LOCALES) {
      out.push({
        url: absoluteUrl(withLocale(lang, page.path)),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates(page.path) },
      });
    }
  }

  for (const m of maisons) {
    const path = `/maisons/${m.slug}`;
    for (const lang of LOCALES) {
      out.push({
        url: absoluteUrl(withLocale(lang, path)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: { languages: alternates(path) },
      });
    }
  }

  for (const slug of CARTE_MAISON_SLUGS) {
    const path = `/carte/${slug}`;
    for (const lang of LOCALES) {
      out.push({
        url: absoluteUrl(withLocale(lang, path)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: alternates(path) },
      });
    }
  }

  return out;
}
