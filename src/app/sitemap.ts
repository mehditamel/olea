import type { MetadataRoute } from "next";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/maisons"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/carte"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/reserver"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/privatisation"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/mentions-legales"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/cgu"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const maisonsPages: MetadataRoute.Sitemap = maisons.map((m) => ({
    url: absoluteUrl(`/maisons/${m.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const cartesPages: MetadataRoute.Sitemap = maisons
    .filter((m) => m.slug !== "villeneuve-loubet")
    .map((m) => ({
      url: absoluteUrl(`/carte/${m.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [...staticPages, ...maisonsPages, ...cartesPages];
}
