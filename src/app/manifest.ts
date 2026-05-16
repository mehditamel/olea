import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maison Oléa",
    short_name: "Oléa",
    description:
      "Cuisine méditerranéenne en Provence et Côte d'Azur — Marseille, Cassis, Villeneuve-Loubet.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4ecdd",
    theme_color: "#1f2218",
    lang: "fr-FR",
    icons: [
      {
        src: "/images/brand/logo.png",
        sizes: "800x600",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
