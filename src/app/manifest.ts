import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Maison Oléa",
    short_name: "Oléa",
    description:
      "Cuisine méditerranéenne en Provence et Côte d'Azur — Marseille, Cassis, Villeneuve-Loubet.",
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4ecdd",
    theme_color: "#1f2218",
    lang: "fr-FR",
    categories: ["food", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Réserver une table",
        short_name: "Réserver",
        description: "Réservez en quelques secondes dans une de nos maisons",
        url: "/fr/reserver",
      },
      {
        name: "Voir la carte",
        short_name: "La carte",
        description: "Découvrez la carte du moment",
        url: "/fr/carte",
      },
      {
        name: "Demande de privatisation",
        short_name: "Privatisation",
        description: "Devis sur-mesure pour votre événement",
        url: "/fr/privatisation",
      },
    ],
  };
}
