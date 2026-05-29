import { OG_CONTENT_TYPE, OG_SIZE, maisonOgImage } from "@/app/_og/og";

export const alt = "Maison Oléa · Marseille";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return maisonOgImage("marseille", lang);
}
