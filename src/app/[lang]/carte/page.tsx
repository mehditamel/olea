import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { maisons } from "@/data/maisons";
import { getMenuBySlug } from "@/data/menu";
import { absoluteUrl, cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EngravingMotif } from "@/components/brand/EngravingMotif";
import { MarseillePortIllustration } from "@/components/brand/illustrations/MarseillePortIllustration";
import { CassisPortIllustration } from "@/components/brand/illustrations/CassisPortIllustration";
import { VilleneuveCoastIllustration } from "@/components/brand/illustrations/VilleneuveCoastIllustration";
import type { MaisonSlug } from "@/types/maison";
import {
  LOCALES,
  type Locale,
  localeHtmlLang,
  localeOgCode,
} from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";
import { localizeMaison } from "@/i18n/localized-maison";

const ILLUSTRATIONS: Record<MaisonSlug, ReactNode> = {
  marseille: <MarseillePortIllustration className="h-full w-full" />,
  cassis: <CassisPortIllustration className="h-full w-full" />,
  "villeneuve-loubet": <VilleneuveCoastIllustration className="h-full w-full" />,
};

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
      <section className="relative overflow-hidden bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16">
        {/* Poulpe gravé — signature culinaire de la charte */}
        <EngravingMotif
          motif="octopus"
          className="pointer-events-none absolute -end-8 bottom-0 h-40 w-56 text-brand-sage opacity-[0.12] md:h-52 md:w-72"
        />
        <div className="relative mx-auto max-w-7xl">
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
          <h1 className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {dict.carte.titre}{" "}
            <span className="font-serif italic text-brand-gold-light">
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
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {maisons.map((raw) => {
              const maison = localizeMaison(raw, l);
              const menu = getMenuBySlug(maison.slug);
              const disponible = menu.statut === "publiee";
              const href = withLocale(l, `/carte/${maison.slug}`);
              return (
                <li key={maison.slug}>
                  <a
                    href={href}
                    className="group block bg-brand-cream-soft border border-brand-ink/10 hover:border-brand-olive/40 transition-colors"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
                      {ILLUSTRATIONS[maison.slug]}
                      {!disponible ? (
                        <span className="absolute top-3 start-3 bg-brand-gold text-brand-ink text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-semibold">
                          {dict.maisons.bientot}
                        </span>
                      ) : null}
                    </div>
                    <div className="p-6 md:p-7">
                      <p className="eyebrow text-brand-olive mb-2">
                        {maison.label}
                      </p>
                      <h2 className="font-sans text-2xl md:text-[28px] text-brand-ink mb-3">
                        {maison.nom}
                      </h2>
                      <p className="text-[15px] leading-[1.65] text-brand-text-muted mb-5">
                        {maison.description}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
                          disponible
                            ? "text-brand-ink group-hover:text-brand-olive"
                            : "text-brand-text-muted",
                        )}
                      >
                        {disponible
                          ? dict.carte.voirLaCarte
                          : dict.carte.bientotDisponible}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
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
