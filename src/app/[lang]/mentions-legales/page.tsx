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
  const path = "/mentions-legales";
  const canonical = absoluteUrl(withLocale(lang, path));
  const alternates = Object.fromEntries(
    LOCALES.map((l) => [localeHtmlLang(l), absoluteUrl(withLocale(l, path))]),
  );
  alternates["x-default"] = absoluteUrl(withLocale("fr", path));
  return {
    title: dict.mentionsLegales.metaTitle,
    description: dict.mentionsLegales.metaDescription,
    alternates: { canonical, languages: alternates },
    robots: { index: true, follow: true },
    openGraph: {
      title: dict.mentionsLegales.metaTitle,
      description: dict.mentionsLegales.metaDescription,
      url: canonical,
      type: "website",
      locale: localeOgCode(lang),
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) =>
        localeOgCode(l),
      ),
    },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const l: Locale = lang;
  const m = dict.mentionsLegales;

  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            ariaLabel={dict.breadcrumbs.aria}
            items={[
              { href: withLocale(l, "/"), label: dict.maisonPage.accueil },
              {
                href: withLocale(l, "/mentions-legales"),
                label: m.eyebrow,
              },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">{m.eyebrow}</p>
          <h1 className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            {m.titre}{" "}
            <span className="font-serif italic text-brand-gold">{m.titreItalic}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-brand-text-soft text-base md:text-lg leading-relaxed">
            {m.sousTitre}
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-12 text-brand-ink">
          <Section title={m.editeur.titre}>
            <Line>{m.editeur.raisonSociale}</Line>
            <Line>{m.editeur.forme}</Line>
            <Line>{m.editeur.siege}</Line>
            <Line>{m.editeur.siret}</Line>
            <Line>{m.editeur.tva}</Line>
            <Line>{m.editeur.directeur}</Line>
            <Line>{m.editeur.contact}</Line>
          </Section>

          <Section title={m.hebergeur.titre}>
            <Line>{m.hebergeur.nom}</Line>
            <Line>
              <bdi>{m.hebergeur.adresse}</bdi>
            </Line>
            <Line>
              <a
                href={m.hebergeur.site}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive"
              >
                <bdi dir="ltr">{m.hebergeur.site}</bdi>
              </a>
            </Line>
          </Section>

          <Section title={m.pi.titre}>
            <p className="text-[15px] leading-[1.85]">{m.pi.texte}</p>
          </Section>

          <Section title={m.donnees.titre}>
            <p className="text-[15px] leading-[1.85] mb-3">{m.donnees.intro}</p>
            <p className="text-[15px] leading-[1.85] mb-3">{m.donnees.collecte}</p>
            <p className="text-[15px] leading-[1.85] mb-3">
              {m.donnees.conservation}
            </p>
            <p className="text-[15px] leading-[1.85]">{m.donnees.contact}</p>
          </Section>

          <Section title={m.cookies.titre}>
            <p className="text-[15px] leading-[1.85]">{m.cookies.texte}</p>
          </Section>

          <Section title={m.droit.titre}>
            <p className="text-[15px] leading-[1.85]">{m.droit.texte}</p>
          </Section>

          <p className="text-xs text-brand-text-muted pt-4 border-t border-brand-ink/10">
            {m.derniereMaj}
          </p>
        </div>
      </section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-sans text-2xl md:text-3xl text-brand-ink mb-4">
        {title}
      </h2>
      <div className="text-[15px] leading-[1.85] text-brand-ink/90 space-y-1">
        {children}
      </div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
