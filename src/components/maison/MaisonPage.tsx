import { notFound } from "next/navigation";
import { getMaisonBySlug } from "@/data/maisons";
import { MaisonHero } from "./MaisonHero";
import { MaisonInfos } from "./MaisonInfos";
import { MaisonMap } from "./MaisonMap";
import { MaisonGallery } from "./MaisonGallery";
import { MaisonInstagram } from "./MaisonInstagram";
import { MaisonReservation } from "./MaisonReservation";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { MaisonSlug } from "@/types/maison";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/locale-href";

export function MaisonPage({
  slug,
  lang,
  dict,
}: {
  slug: MaisonSlug;
  lang: Locale;
  dict: Dictionary;
}) {
  const maison = getMaisonBySlug(slug);
  if (!maison) notFound();

  return (
    <>
      <RestaurantJsonLd maison={maison} lang={lang} />
      <MaisonHero maison={maison} lang={lang} dict={dict} />
      <div className="bg-brand-cream px-6 md:px-12 pt-8 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="dark"
            ariaLabel={dict.breadcrumbs.aria}
            items={[
              { href: withLocale(lang, "/"), label: dict.maisonPage.accueil },
              {
                href: withLocale(lang, "/maisons"),
                label: dict.maisonPage.maisons,
              },
              {
                href: withLocale(lang, `/maisons/${maison.slug}`),
                label: maison.nom,
              },
            ]}
          />
        </div>
      </div>
      <MaisonInfos maison={maison} lang={lang} dict={dict} />
      <MaisonMap maison={maison} />
      <MaisonGallery maison={maison} dict={dict} />
      <MaisonInstagram maison={maison} dict={dict} />
      <MaisonReservation maison={maison} lang={lang} dict={dict} />
    </>
  );
}
