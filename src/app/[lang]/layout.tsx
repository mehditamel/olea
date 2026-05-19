import type { Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { absoluteUrl, SITE_URL } from "@/lib/utils";
import {
  LOCALES,
  type Locale,
  isRtl,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { withLocale } from "@/i18n/locale-href";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4ecdd",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const canonical = absoluteUrl(withLocale(lang, "/"));
  const alternateLanguages = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, "/"))]),
  );
  alternateLanguages["x-default"] = absoluteUrl(withLocale("fr", "/"));
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.homeTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.homeDescription,
    applicationName: dict.meta.applicationName,
    authors: [{ name: "Maison Oléa" }],
    alternates: { canonical, languages: alternateLanguages },
    openGraph: {
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
      url: canonical,
      siteName: "Maison Oléa",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: dict.meta.twitterTitle,
      description: dict.meta.twitterDescription,
    },
    formatDetection: { telephone: true },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default" as const,
      title: dict.meta.appleTitle,
    },
    icons: { apple: "/icons/apple-touch-icon.png" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={localeHtmlLang(lang as Locale)}
      dir={isRtl(lang as Locale) ? "rtl" : "ltr"}
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-ink pb-[68px] md:pb-0">
        <LocaleProvider lang={lang as Locale} dict={dict}>
          <a href="#contenu" className="skip-link">
            {dict.common.skipLink}
          </a>
          <div role="status" aria-live="polite" className="sr-only">
            {dict.languageSwitcher.changed}
          </div>
          <SiteHeader lang={lang as Locale} dict={dict} />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter lang={lang as Locale} dict={dict} />
          <MobileCtaBar lang={lang as Locale} dict={dict} />
          <InstallPrompt dict={dict.pwa} />
          <ServiceWorkerRegister />
        </LocaleProvider>
      </body>
    </html>
  );
}
