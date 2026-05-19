import { notFound } from "next/navigation";
import { Phone, WifiOff } from "lucide-react";
import { maisons } from "@/data/maisons";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="bg-brand-ink text-brand-cream min-h-[70vh] px-6 md:px-12 py-20 md:py-28 flex items-center">
      <div className="mx-auto max-w-2xl w-full text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-cream/10 text-brand-gold mb-8">
          <WifiOff className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif font-normal text-[clamp(36px,6vw,56px)] leading-[1.05] tracking-[-0.5px] mb-6">
          {dict.offline.titre}
        </h1>
        <p className="text-brand-text-soft mb-10 max-w-md mx-auto">
          {dict.offline.sousTitre}
        </p>

        <ul className="space-y-3 text-start max-w-md mx-auto mb-10">
          {maisons
            .filter((m) => m.ouvert)
            .map((maison) => (
              <li
                key={maison.slug}
                className="flex items-center justify-between gap-3 border-b border-brand-cream/15 pb-3"
              >
                <span className="font-serif text-lg">{maison.nom}</span>
                <a
                  href={`tel:${maison.telephone}`}
                  className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-light transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <bdi dir="ltr">{maison.telephoneAffichage}</bdi>
                </a>
              </li>
            ))}
        </ul>

        <form action={withLocale(lang, "/")} className="inline-block">
          <button
            type="submit"
            className="px-8 h-12 text-[11px] uppercase tracking-[0.2em] bg-brand-cream text-brand-ink hover:bg-brand-gold-light transition-colors"
          >
            {dict.offline.cta}
          </button>
        </form>
      </div>
    </section>
  );
}
