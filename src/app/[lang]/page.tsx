import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { MaisonsGrid } from "@/components/home/MaisonsGrid";
import { EspritSection } from "@/components/home/EspritSection";
import { PrivatReservSection } from "@/components/home/PrivatReservSection";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Pillars dict={dict} />
      <MaisonsGrid lang={lang} dict={dict} />
      <EspritSection lang={lang} dict={dict} />
      <PrivatReservSection lang={lang} dict={dict} />
    </>
  );
}
