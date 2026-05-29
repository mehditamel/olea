// Génère toutes les icônes PWA, splash screens iOS et screenshots manifest.
// - App icons (favicon, PWA, Apple) : symbole « O » de la charte sur fond olive.
// - Splash & screenshots : logotype (wordmark) centré sur blanc cassé.
// À relancer manuellement quand la charte change : `pnpm icons`.
// Les fichiers produits sont commités (zéro dépendance runtime).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "public/images/brand/logo.png");
const OUT_DIR = join(ROOT, "public/icons");
const APP_DIR = join(ROOT, "src/app");
const SPLASH_SPECS = join(ROOT, "src/lib/pwa/apple-splash-screens.json");

// Charte Oléa Group 2026.
const OLIVE = "#75774a"; // Vert olive signature (ADN)
const CREAM = "#feffeb"; // Blanc cassé (respiration)
// Fond des splash/screenshots = blanc cassé.
const BG = { r: 254, g: 255, b: 235, alpha: 1 };

// Symbole « O » incliné de la charte (cf. src/app/icon.svg / OleaSymbol).
// `rxRatio` : arrondi des coins (0 = plein bord, pour le maskable/Apple).
// `scale`   : taille du « O » dans le carré (réduit pour la safe-zone maskable).
function symbolSvg(size, { rxRatio = 0, scale = 1 } = {}) {
  const rx = (rxRatio * 32).toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${rx}" fill="${OLIVE}"/>
  <g transform="translate(16 16) scale(${scale}) translate(-16 -16)">
    <g transform="rotate(-12 16 16)">
      <ellipse cx="16" cy="16" rx="10" ry="11" fill="${CREAM}"/>
      <ellipse cx="16" cy="16" rx="5.2" ry="9.4" fill="${OLIVE}"/>
    </g>
  </g>
</svg>`;
}

function appIcon(size, opts) {
  return sharp(Buffer.from(symbolSvg(size, opts)), { density: 384 })
    .resize(size, size)
    .png({ quality: 92 });
}

// Enveloppe ICO minimale autour d'un PNG (supporté par tous les navigateurs
// modernes) — évite une dépendance supplémentaire.
function buildIco(pngBuffer, dim) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(1, 4); // count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(dim >= 256 ? 0 : dim, 0); // width
  entry.writeUInt8(dim >= 256 ? 0 : dim, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // size of PNG
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  return Buffer.concat([header, entry, pngBuffer]);
}

// Canvas blanc cassé avec logotype centré (splash iOS & screenshots manifest).
async function renderCanvas(width, height, logoRatio, dest) {
  const logoSize = Math.round(Math.min(width, height) * logoRatio);
  const logo = await sharp(SOURCE)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 254, g: 255, b: 235, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: { width, height, channels: 4, background: BG },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ quality: 92 })
    .toFile(dest);
}

async function generate() {
  await mkdir(OUT_DIR, { recursive: true });

  // App icons — symbole « O » sur fond olive.
  const jobs = [
    // Android / PWA "any" — coins arrondis charte, « O » plein.
    { name: "icon-192.png", size: 192, rxRatio: 0.1875, scale: 1 },
    { name: "icon-512.png", size: 512, rxRatio: 0.1875, scale: 1 },
    // Maskable Android — plein bord, « O » réduit dans la safe-zone (~80%).
    { name: "icon-maskable-512.png", size: 512, rxRatio: 0, scale: 0.62 },
    // iOS apple-touch-icon — plein bord (iOS arrondit lui-même), léger souffle.
    { name: "apple-touch-icon.png", size: 180, rxRatio: 0, scale: 0.92 },
    // Favicon PNG de secours — coins arrondis charte.
    { name: "favicon-32.png", size: 32, rxRatio: 0.1875, scale: 1 },
  ];

  for (const job of jobs) {
    const dest = join(OUT_DIR, job.name);
    await appIcon(job.size, { rxRatio: job.rxRatio, scale: job.scale }).toFile(
      dest,
    );
    console.log(`  ✓ ${job.name} (${job.size}x${job.size})`);
  }

  // app/apple-icon.png — Apple touch icon servi par Next (plein bord olive).
  await appIcon(180, { rxRatio: 0, scale: 0.92 }).toFile(
    join(APP_DIR, "apple-icon.png"),
  );
  console.log("  ✓ src/app/apple-icon.png (180x180)");

  // app/favicon.ico — favicon hérité (PNG 32px encapsulé en ICO).
  const faviconPng = await appIcon(32, { rxRatio: 0.1875, scale: 1 }).toBuffer();
  await writeFile(join(APP_DIR, "favicon.ico"), buildIco(faviconPng, 32));
  console.log("  ✓ src/app/favicon.ico (32x32)");

  // Splash screens iOS (portrait) — specs partagées avec AppleSplashLinks.
  const specs = JSON.parse(await readFile(SPLASH_SPECS, "utf8"));
  for (const { dw, dh, ratio } of specs) {
    const w = dw * ratio;
    const h = dh * ratio;
    const name = `apple-splash-${w}x${h}.png`;
    await renderCanvas(w, h, 0.34, join(OUT_DIR, name));
    console.log(`  ✓ ${name}`);
  }

  // Screenshots manifest — dialogue d'installation enrichi.
  const shots = [
    { name: "screenshot-narrow.png", w: 1080, h: 1920, ratio: 0.42 },
    { name: "screenshot-wide.png", w: 1920, h: 1080, ratio: 0.3 },
  ];
  for (const { name, w, h, ratio } of shots) {
    await renderCanvas(w, h, ratio, join(OUT_DIR, name));
    console.log(`  ✓ ${name} (${w}x${h})`);
  }

  console.log(`\nGénéré dans ${OUT_DIR} et ${APP_DIR}`);
}

generate().catch((err) => {
  console.error("Erreur de génération:", err);
  process.exit(1);
});
