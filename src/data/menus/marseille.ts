import type { MaisonMenu } from "../menu";

export const marseilleMenu: MaisonMenu = {
  slug: "marseille",
  statut: "publiee",
  intro:
    "Une cuisine méditerranéenne servie face au Vieux-Port, au gré du marché et des arrivages du jour.",
  sections: [
    {
      slug: "partager",
      titre: "Nos assiettes à partager",
      plats: [
        { nom: "Frites truffées" },
        { nom: "Frites classiques" },
        { nom: "Friture de jols" },
        { nom: "Panisses et aïoli maison" },
        { nom: "Planche de charcuteries à partager" },
        { nom: "Planche de fromages à partager" },
        {
          nom: "Burrata crémeuse",
          description: "Pesto rosso à base de tomates séchées.",
        },
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
          nom: "Steak haché ou poulet pané, frites maison",
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
          nom: "Poke bowl",
          description:
            "Quinoa, mi-cuit de thon au sésame, gambas, billes de saumon farcies.",
        },
        {
          nom: "Supions en persillade",
          description: "Petits calamars sautés à l'ail et au persil.",
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
        {
          nom: "Linguine à la vongole",
          description: "Palourdes, ail, vin blanc et persil.",
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
          nom: "Poulpe grillé",
          description: "Mousseline de patates douces, légumes.",
        },
        {
          nom: "Soupe de poissons et filet de daurade",
          description: "Pommes de terre safranées.",
        },
      ],
    },
    {
      slug: "terre",
      titre: "Terre",
      plats: [
        {
          nom: "Burger du chef",
          description:
            "Steak haché 180 g, caviar de tomates, oignons rouges confits.",
        },
        {
          nom: "Tartare de bœuf corse coupé au couteau",
          description: "Brousse, pesto de menthe, pignons.",
        },
        {
          nom: "Escalope façon Oléa",
          description:
            "Escalope de veau panée, pistaches, pignons et crème de fromage.",
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
      plats: [
        { nom: "Moelleux au chocolat" },
        { nom: "Tiramisu caramel et spéculos" },
        { nom: "Pain perdu caramel ou Nutella" },
        { nom: "Desserts maison du jour" },
      ],
    },
  ],
};
