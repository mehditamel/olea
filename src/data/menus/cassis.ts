import type { MaisonMenu } from "../menu";

export const cassisMenu: MaisonMenu = {
  slug: "cassis",
  statut: "publiee",
  intro:
    "Sur le port de Cassis, à deux pas des Calanques, une carte tournée vers la mer et les produits de Méditerranée.",
  sections: [
    {
      slug: "partager",
      titre: "Nos assiettes à partager",
      plats: [
        { nom: "Frites truffées" },
        { nom: "Panisses et aïoli maison" },
        { nom: "Sticks de mozzarella" },
        { nom: "Samoussas chèvre-miel (x6)" },
        { nom: "Planche de charcuteries à partager" },
        { nom: "Planche de fromages à partager" },
        { nom: "Rôti d'aubergines et tomates cerises" },
        {
          nom: "Gambas frits aux cheveux d'anges",
          description: "Mayonnaise citronnée aux herbes.",
        },
        {
          nom: "Carpaccio d'artichaut",
          description:
            "Vinaigrette à la truffe, copeaux de truffe et parmesan.",
        },
      ],
    },
    {
      slug: "enfant",
      titre: "Menu enfant",
      plats: [
        {
          nom: "Steak haché ou poulet pané et frites maison",
          description: "Sirop au choix et une boule de glace.",
        },
      ],
    },
    {
      slug: "salades",
      titre: "Nos salades",
      plats: [
        {
          nom: "Salade de chèvre chaud au miel",
          description:
            "Bacon grillé, champignons de Paris, carottes grillées, crispy d'oignons rouges.",
        },
        {
          nom: "Salade César",
          description:
            "Romaine, tomates cerises, parmesan, aiguillettes de poulet pané, œuf poché.",
        },
        {
          nom: "Camembert au four",
          description: "Servi avec mesclun, miel et noix.",
        },
      ],
    },
    {
      slug: "pates",
      titre: "Pâtes",
      plats: [
        {
          nom: "Pâtes tortiglioni",
          description: "Sauce tomate maison, burrata, pesto.",
        },
        { nom: "Ravioli de la cheffe" },
        {
          nom: "Pâtes orzo et boulettes de bœuf à la grecque",
          description: "Sauce tomate épicée, feta, menthe fraîche.",
        },
        {
          nom: "Gnocchi au saumon, sauce à la courgette",
          description: "Émincé de saumon, crème de courgette, basilic.",
        },
      ],
    },
    {
      slug: "mer",
      titre: "Mer",
      plats: [
        {
          nom: "Risotto crémeux",
          description: "Noix de Saint-Jacques, gambas et fumet de homard.",
        },
        {
          nom: "Tartare de saumon",
          description: "Aux agrumes et mousse d'avocat.",
        },
        {
          nom: "Tataki de thon",
          description: "Sésame, sauce teriyaki et vierge, riz et salade.",
        },
        {
          nom: "Pavé de saumon",
          description: "Légumes du moment et sauce vierge.",
        },
        {
          nom: "Poulpe grillé",
          description: "Mousseline de patates douces, légumes.",
        },
        {
          nom: "Bar entier (600 g)",
          description: "Grillé à la plancha, fenouil rôti et citron confit.",
        },
        {
          nom: "Mini bouillabaisse",
          description: "Poissons de roche, rouille et croûtons aillés.",
        },
      ],
    },
    {
      slug: "terre",
      titre: "Terre",
      plats: [
        {
          nom: "Burger de la cheffe",
          description:
            "Steak haché 180 g, caviar de tomates, oignons rouges confits.",
        },
        {
          nom: "Tartare de bœuf corse coupé au couteau",
          description: "Brousse, pesto de menthe, pignons.",
        },
        {
          nom: "Osso buco cuit à l'ancienne",
          description: "Mijoté lentement, gremolata et polenta crémeuse.",
        },
        { nom: "Cordon bleu maison" },
        {
          nom: "Filet de poulet farci tomate, basilic et mozzarella",
          description: "Légumes du moment.",
        },
        {
          nom: "Magret de canard farci au foie gras",
          description: "Sauce aux figues et purée maison.",
        },
        {
          nom: "Entrecôte Black Angus d'Uruguay",
          description: "Baby potatoes, salade, sauce au choix.",
        },
      ],
    },
    {
      slug: "desserts",
      titre: "Nos desserts",
      plats: [{ nom: "Desserts maison du jour" }],
    },
  ],
  vins: [
    {
      couleur: "Blancs",
      cuvees: [
        "Chardonnay — Domaine Preignes",
        "Domaine Bagrau",
        "French Dog",
        "Château La Coste",
        "Château de Frontcreuse",
        "Domaine Barat",
      ],
    },
    {
      couleur: "Rosés",
      cuvees: [
        "Domaine Bagrau",
        "Château de l'Escarelle",
        "Château La Coste — Rosé Nuit",
        "Maison Sainte Marguerite — Symphonie",
      ],
    },
    {
      couleur: "Rouges",
      cuvees: [
        "Les Enfants Terribles",
        "Vinsobres",
        "Château La Coste",
        "Crozes-Hermitage",
      ],
    },
    {
      couleur: "Champagne",
      cuvees: ["Mumm Cordon Rouge"],
    },
  ],
};
