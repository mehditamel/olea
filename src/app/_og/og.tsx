// Rendu partagé des images sociales (Open Graph / Twitter) via next/og.
// Charte Oléa : blanc cassé, olive signature, logotype Baskerville italique.
// Polices locales chargées depuis _og/fonts (les polices next/font ne sont
// pas lisibles comme Buffer). `_og` est ignoré comme route (préfixe « _ »).
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { hasLocale } from "@/i18n/dictionaries";
import { getMaisonBySlug } from "@/data/maisons";
import { localizeMaison } from "@/i18n/localized-maison";
import type { MaisonSlug } from "@/types/maison";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const OLIVE = "#75774a"; // signature (ADN)
const INK = "#1f2218"; // encre
const CREAM = "#feffeb"; // blanc cassé
const MUTED = "#5f6040"; // olive sombre — lisible sur crème

async function loadFonts() {
  const dir = join(process.cwd(), "src/app/_og/fonts");
  const [jost, baskerville] = await Promise.all([
    readFile(join(dir, "Jost-Medium.woff")),
    readFile(join(dir, "LibreBaskerville-Italic.woff")),
  ]);
  return [
    { name: "Jost", data: jost, weight: 500 as const, style: "normal" as const },
    {
      name: "Libre Baskerville",
      data: baskerville,
      weight: 400 as const,
      style: "italic" as const,
    },
  ];
}

// Symbole « O » incliné de la charte (olive, anneau évidé en crème).
function OSymbol({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <g transform="rotate(-12 16 16)">
        <ellipse cx="16" cy="16" rx="10" ry="11" fill={OLIVE} />
        <ellipse cx="16" cy="16" rx="5.2" ry="9.4" fill={CREAM} />
      </g>
    </svg>
  );
}

function Frame() {
  return (
    <div
      style={{
        position: "absolute",
        top: 38,
        left: 38,
        right: 38,
        bottom: 38,
        border: `2px solid ${OLIVE}`,
        opacity: 0.3,
      }}
    />
  );
}

const shell = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: CREAM,
  fontFamily: "Jost",
  fontWeight: 500,
  position: "relative" as const,
  padding: "80px",
};

export async function renderBrandOg({
  eyebrow,
  tagline,
}: {
  eyebrow: string;
  tagline: string;
}) {
  return new ImageResponse(
    (
      <div style={shell}>
        <Frame />
        <OSymbol size={104} />
        <div
          style={{
            marginTop: 26,
            fontSize: 30,
            letterSpacing: 16,
            color: OLIVE,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: "Libre Baskerville",
            fontStyle: "italic",
            fontSize: 150,
            lineHeight: 1,
            color: INK,
          }}
        >
          Oléa
        </div>
        <div
          style={{
            width: 130,
            height: 2,
            backgroundColor: OLIVE,
            opacity: 0.6,
            margin: "30px 0",
          }}
        />
        <div
          style={{
            fontSize: 33,
            color: MUTED,
            maxWidth: 800,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

// Image OG d'une maison (ville + signature + description localisée).
export async function maisonOgImage(slug: MaisonSlug, lang: string) {
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const maison = getMaisonBySlug(slug);
  if (!maison) {
    return renderBrandOg({ eyebrow: "Maison", tagline: "" });
  }
  const m = localizeMaison(maison, locale);
  return renderMaisonOg({
    ville: m.ville,
    description: m.description,
    accent: m.accent,
  });
}

export async function renderMaisonOg({
  ville,
  description,
  accent,
}: {
  ville: string;
  description: string;
  accent: string;
}) {
  return new ImageResponse(
    (
      <div style={shell}>
        <Frame />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            letterSpacing: 14,
            color: OLIVE,
            textTransform: "uppercase",
          }}
        >
          <OSymbol size={40} />
          <span>Maison Oléa</span>
        </div>
        <div
          style={{
            fontFamily: "Libre Baskerville",
            fontStyle: "italic",
            fontSize: 132,
            lineHeight: 1,
            color: INK,
            marginTop: 22,
          }}
        >
          Oléa
        </div>
        <div
          style={{
            fontSize: 46,
            letterSpacing: 10,
            color: INK,
            textTransform: "uppercase",
            marginTop: 14,
          }}
        >
          {ville}
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: accent,
            margin: "28px 0",
          }}
        />
        <div
          style={{
            fontSize: 30,
            color: MUTED,
            maxWidth: 820,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
