import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maison Oléa — Cuisine méditerranéenne · Marseille, Cassis, Villeneuve-Loubet",
    template: "%s — Maison Oléa",
  },
  description:
    "Maison Oléa célèbre la Méditerranée à travers trois maisons : Marseille, Cassis et Villeneuve-Loubet. Une cuisine sincère, des produits frais et locaux.",
  applicationName: "Maison Oléa",
  authors: [{ name: "Maison Oléa" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Maison Oléa",
    title: "Maison Oléa — Cuisine méditerranéenne",
    description:
      "Trois maisons, un même geste : célébrer la lumière du Sud à travers une cuisine sincère et le partage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Oléa",
    description:
      "Cuisine méditerranéenne en Provence et Côte d'Azur — Marseille · Cassis · Villeneuve-Loubet.",
  },
  alternates: { canonical: SITE_URL },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-ink pb-[68px] md:pb-0">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
