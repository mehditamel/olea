import { notFound } from "next/navigation";
import { MaisonPage } from "@/components/maison/MaisonPage";
import { maisonMetadata } from "@/components/maison/maison-metadata";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

const SLUG = "marseille" as const;

export function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return maisonMetadata(SLUG, params);
}

export default async function MarseillePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <MaisonPage slug={SLUG} lang={lang} dict={dict} />;
}
