import { notFound } from "next/navigation";
import { getMaisonBySlug } from "@/data/maisons";
import { MaisonHero } from "./MaisonHero";
import { MaisonInfos } from "./MaisonInfos";
import { MaisonMap } from "./MaisonMap";
import { MaisonGallery } from "./MaisonGallery";
import { MaisonReservation } from "./MaisonReservation";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { MaisonSlug } from "@/types/maison";

export function MaisonPage({ slug }: { slug: MaisonSlug }) {
  const maison = getMaisonBySlug(slug);
  if (!maison) notFound();

  return (
    <>
      <RestaurantJsonLd maison={maison} />
      <MaisonHero maison={maison} />
      <div className="bg-brand-cream px-6 md:px-12 pt-8 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="dark"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/maisons", label: "Maisons" },
              { href: `/maisons/${maison.slug}`, label: maison.nom },
            ]}
          />
        </div>
      </div>
      <MaisonInfos maison={maison} />
      <MaisonMap maison={maison} />
      <MaisonGallery maison={maison} />
      <MaisonReservation maison={maison} />
    </>
  );
}
