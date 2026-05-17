import type { Maison } from "@/types/maison";

/**
 * Source unique de vérité pour les 3 maisons Oléa.
 * Toute information d'adresse, horaire ou téléphone affichée sur le site provient d'ici.
 */
export const maisons: readonly Maison[] = [
  {
    slug: "marseille",
    nom: "Marseille",
    label: "Maison-mère",
    adresse: "8 Rue Euthymènes",
    codePostal: "13001",
    ville: "Marseille",
    pays: "FR",
    telephone: "+33625151333",
    telephoneAffichage: "06 25 15 13 33",
    coordonnees: { lat: 43.2951, lng: 5.3735 },
    description:
      "Une terrasse bordée d'oliviers face au Vieux-Port, l'écrin originel d'Oléa.",
    ouvert: true,
    dateOuverture: "2019-01-01",
    horaires: [
      { jour: "mardi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "mercredi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "jeudi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "vendredi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "samedi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "dimanche", dejeuner: "12:00-15:00", diner: null },
    ],
    fourchettePrix: "€€",
    cuisines: ["Méditerranéenne", "Provençale", "Française"],
    fermetureHebdo: ["lundi"],
    photoHero: "/images/maisons/marseille/hero.jpg",
    photos: [
      "/images/maisons/marseille/salle.jpg",
      "/images/maisons/marseille/terrasse.jpg",
      "/images/maisons/marseille/ambiance.jpg",
      "/images/maisons/marseille/plat-1.jpg",
      "/images/maisons/marseille/plat-2.jpg",
      "/images/maisons/marseille/detail.jpg",
    ],
    accent: "#4A5530",
    reservationUrl: "",
    instagram: {
      handle: "olea.marseille",
      url: "https://www.instagram.com/olea.marseille/",
    },
  },
  {
    slug: "cassis",
    nom: "Cassis",
    label: "Sur le port",
    adresse: "15 Quai Jean Jacques Barthélémy",
    codePostal: "13260",
    ville: "Cassis",
    pays: "FR",
    telephone: "+33625151333",
    telephoneAffichage: "06 25 15 13 33",
    coordonnees: { lat: 43.2147, lng: 5.5391 },
    description:
      "Face aux pointus et à la falaise des Calanques, les pieds dans la Méditerranée.",
    ouvert: true,
    horaires: [
      { jour: "mardi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "mercredi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "jeudi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "vendredi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "samedi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "dimanche", dejeuner: "12:00-15:00", diner: "19:00-22:00" },
    ],
    fourchettePrix: "€€",
    cuisines: ["Méditerranéenne", "Provençale", "Poissons & fruits de mer"],
    fermetureHebdo: ["lundi"],
    photoHero: "",
    photos: [],
    accent: "#5C8170",
    reservationUrl: "",
    instagram: {
      handle: "olea.cassis",
      url: "https://www.instagram.com/olea.cassis/",
    },
  },
  {
    slug: "villeneuve-loubet",
    nom: "Villeneuve-Loubet",
    label: "Côte d'Azur",
    adresse: "1220 RN 7",
    codePostal: "06270",
    ville: "Villeneuve-Loubet",
    pays: "FR",
    telephone: "+33625151333",
    telephoneAffichage: "06 25 15 13 33",
    coordonnees: { lat: 43.6358, lng: 7.1422 },
    description:
      "Notre nouvelle maison azuréenne, entre mer et arrière-pays niçois.",
    ouvert: true,
    badgeOuverture: "Nouveau",
    horaires: [
      { jour: "mardi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "mercredi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "jeudi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
      { jour: "vendredi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "samedi", dejeuner: "12:00-14:30", diner: "19:00-23:00" },
      { jour: "dimanche", dejeuner: "12:00-15:00", diner: "19:00-22:00" },
    ],
    fourchettePrix: "€€",
    cuisines: ["Méditerranéenne", "Provençale", "Niçoise"],
    fermetureHebdo: ["lundi"],
    photoHero: "",
    photos: [],
    accent: "#C49960",
    reservationUrl: "",
    instagram: {
      // Compte bientôt actif — handle réservé.
      handle: "olea.villeneuve",
    },
  },
] as const;

export function getMaisonBySlug(slug: string): Maison | undefined {
  return maisons.find((m) => m.slug === slug);
}
