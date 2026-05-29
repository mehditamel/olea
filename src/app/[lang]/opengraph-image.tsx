import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { OG_CONTENT_TYPE, OG_SIZE, renderBrandOg } from "@/app/_og/og";

export const alt = "Maison Oléa — Cuisine méditerranéenne";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  return renderBrandOg({ eyebrow: "Maison", tagline: dict.footer.tagline });
}
