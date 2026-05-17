// Génère toutes les icônes PWA depuis public/images/brand/logo.png.
// À relancer manuellement quand le logo source change : `pnpm icons`.
// Les PNG produits sont commités dans public/icons/ (zéro dépendance runtime).

import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "public/images/brand/logo.png");
const OUT_DIR = join(ROOT, "public/icons");

const BG = { r: 244, g: 236, b: 221, alpha: 1 }; // brand-cream #f4ecdd

async function squareFit(size, paddingRatio) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const resized = await sharp(SOURCE)
    .resize(inner, inner, {
      fit: "contain",
      background: BG,
    })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png({ quality: 92 });
}

async function generate() {
  await mkdir(OUT_DIR, { recursive: true });

  const jobs = [
    // Android home screen — padding modéré
    { name: "icon-192.png", size: 192, padding: 0.08 },
    { name: "icon-512.png", size: 512, padding: 0.08 },
    // Maskable Android — safe zone ~80% (padding 20% par côté)
    { name: "icon-maskable-512.png", size: 512, padding: 0.18 },
    // iOS apple-touch-icon — fond plein (pas de transparence)
    { name: "apple-touch-icon.png", size: 180, padding: 0.1 },
    // Favicon PNG de secours
    { name: "favicon-32.png", size: 32, padding: 0.05 },
  ];

  for (const job of jobs) {
    const pipeline = await squareFit(job.size, job.padding);
    const dest = join(OUT_DIR, job.name);
    await pipeline.toFile(dest);
    console.log(`  ✓ ${job.name} (${job.size}x${job.size})`);
  }

  console.log(`\nGénéré dans ${OUT_DIR}`);
}

generate().catch((err) => {
  console.error("Erreur de génération:", err);
  process.exit(1);
});
