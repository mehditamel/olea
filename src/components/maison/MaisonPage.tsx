import { notFound } from "next/navigation";
import { getMaisonBySlug } from "@/data/maisons";
import { MaisonHero } from "./MaisonHero";
import { MaisonInfos } from "./MaisonInfos";
import { MaisonGallery } from "./MaisonGallery";
import { MaisonReservation } from "./MaisonReservation";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import type { MaisonSlug } from "@/types/maison";

export function MaisonPage({ slug }: { slug: MaisonSlug }) {
  const maison = getMaisonBySlug(slug);
  if (!maison) notFound();

  return (
    <>
      <RestaurantJsonLd maison={maison} />
      <MaisonHero maison={maison} />
      <MaisonInfos maison={maison} />
      <MaisonGallery maison={maison} />
      <MaisonReservation maison={maison} />
    </>
  );
}
