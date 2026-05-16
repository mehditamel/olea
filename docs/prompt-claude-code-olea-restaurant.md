# Prompt Claude Code — olea-restaurant.fr

## Contexte

Tu vas créer le site web de **Maison Oléa**, restaurant de cuisine méditerranéenne avec trois adresses : Marseille (maison-mère), Cassis, et Villeneuve-Loubet (nouvelle ouverture). Le repo GitHub et le projet Vercel sont déjà créés.

Le site actuel `olea-marseille.fr` est un WordPress mono-adresse à remplacer entièrement. Le nouveau domaine sera `olea-restaurant.fr`. La marque commerciale est **"Maison Oléa"**, signature courte **"Oléa"**.

Un prototype HTML statique de la homepage existe (esthétique validée) : direction "sensorielle restaurant", palette crème/encre/or, typo Cormorant Garamond + Inter, photos pleine page, sections sombres pour les maisons. Tu dois t'inspirer fidèlement de ce prototype mais le réécrire proprement en Next.js avec composants réutilisables.

## Stack imposée

- **Next.js 14+** (App Router, Server Components par défaut)
- **TypeScript strict** (`strict: true`, `noUncheckedIndexedAccess: true`)
- **Tailwind CSS** (mobile-first, pas de CSS module sauf cas exceptionnel)
- **shadcn/ui** pour les primitives interactives (Button, Sheet pour menu mobile, Dialog)
- **next/font** pour Cormorant Garamond + Inter (chargement local, pas de Google Fonts CDN)
- **next/image** obligatoire pour toutes les photos
- **Zod** pour la validation des formulaires (contact, devis)
- **Pino** pour les logs côté serveur (cohérence écosystème TAMEL)
- Déploiement **Vercel** (préviews PR activées)

## Règles d'ingénierie (CLAUDE.md à créer)

À la racine du projet, créer un `CLAUDE.md` reprenant ces règles non-négociables :

- TypeScript strict, **aucun `any`** (utiliser `unknown` puis narrow)
- **Pas de fichier > 300 lignes** (sinon découper en sous-composants)
- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`)
- Composants React en PascalCase, hooks en camelCase préfixés `use`
- Server Components par défaut, `'use client'` uniquement si nécessaire (interactivité, hooks navigateur)
- Une seule **source de vérité** pour les données des trois maisons : `src/data/maisons.ts` (typé, importé partout)
- **Mobile-first** : commencer par les classes Tailwind sans breakpoint, puis ajouter `md:` / `lg:`
- Accessibilité : alt sur toutes les images, focus visible, contraste AAA sur les textes longs, navigation clavier
- SEO obligatoire : `metadata` sur chaque page, JSON-LD `Restaurant` sur chaque page d'adresse, sitemap, robots.txt
- **Pas de localStorage** côté client si non nécessaire

## Arborescence cible

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, header, footer)
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Tailwind + variables CSS
│   ├── sitemap.ts                    # Sitemap dynamique
│   ├── robots.ts                     # Robots.txt
│   ├── maisons/
│   │   ├── page.tsx                  # Liste des 3 maisons
│   │   ├── marseille/page.tsx
│   │   ├── cassis/page.tsx
│   │   └── villeneuve-loubet/page.tsx
│   ├── carte/page.tsx                # Carte (commune ou onglets par maison)
│   ├── privatisation/page.tsx        # Page événements / devis
│   ├── contact/page.tsx              # Contact général
│   └── api/
│       └── devis/route.ts            # POST pour formulaire devis (Zod + email)
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx            # Header transparent sur hero, opaque ensuite
│   │   ├── SiteFooter.tsx            # Footer 4 colonnes (logo + 3 adresses)
│   │   └── MobileNav.tsx             # Sheet shadcn pour mobile
│   ├── home/
│   │   ├── Hero.tsx                  # Section hero plein écran
│   │   ├── Pillars.tsx               # 3 piliers (produits frais / fait maison / partage)
│   │   ├── MaisonsGrid.tsx           # Grille 3 cartes (sur fond sombre)
│   │   ├── EspritSection.tsx         # Section "L'esprit Oléa"
│   │   └── PrivatReservSection.tsx   # Privatisation + bloc réservation
│   ├── maison/
│   │   ├── MaisonHero.tsx            # Hero d'une page d'adresse
│   │   ├── MaisonInfos.tsx           # Adresse, horaires, téléphone
│   │   ├── MaisonGallery.tsx         # Galerie photos
│   │   └── MaisonReservation.tsx     # Widget réservation (TheFork ou tel:)
│   ├── ui/                           # shadcn primitives
│   └── seo/
│       └── RestaurantJsonLd.tsx      # JSON-LD schema.org/Restaurant
├── data/
│   ├── maisons.ts                    # Source unique : 3 maisons typées
│   └── menu.ts                       # Carte (optionnel pour v1)
├── lib/
│   ├── logger.ts                     # Pino
│   └── utils.ts                      # cn() + helpers
└── types/
    └── maison.ts                     # Types Maison, Horaire, etc.
```

## Source de vérité des trois maisons

Fichier `src/data/maisons.ts` à créer avec exactement cette structure (les valeurs sont à compléter par le client après bootstrap, mais le schéma doit être figé) :

```typescript
import type { Maison } from '@/types/maison';

export const maisons: Maison[] = [
  {
    slug: 'marseille',
    nom: 'Marseille',
    label: 'Maison-mère',
    adresse: '8 Rue Euthymènes',
    codePostal: '13001',
    ville: 'Marseille',
    pays: 'FR',
    telephone: '+33625151333',
    telephoneAffichage: '06 25 15 13 33',
    coordonnees: { lat: 43.2951, lng: 5.3735 }, // À vérifier
    description: "Une terrasse bordée d'oliviers face au Vieux-Port, l'écrin originel d'Oléa.",
    ouvert: true,
    dateOuverture: '2019-01-01',
    horaires: [
      { jour: 'mardi', dejeuner: '12:00-14:30', diner: '19:00-22:30' },
      // À compléter pour tous les jours
    ],
    fourchettePrix: '€€',
    cuisines: ['Méditerranéenne', 'Provençale', 'Française'],
    fermetureHebdo: ['lundi'],
    photoHero: '/images/maisons/marseille/hero.jpg',
    photos: [
      '/images/maisons/marseille/salle.jpg',
      '/images/maisons/marseille/terrasse.jpg',
      '/images/maisons/marseille/plat-1.jpg',
    ],
    accent: '#4A5530', // vert olivier pour cette maison
    reservationUrl: 'https://www.thefork.fr/...', // À compléter
  },
  {
    slug: 'cassis',
    nom: 'Cassis',
    label: 'Sur le port',
    adresse: '15 Quai Jean Jacques Barthélémy',
    codePostal: '13260',
    ville: 'Cassis',
    pays: 'FR',
    telephone: '+33625151333',
    telephoneAffichage: '06 25 15 13 33',
    coordonnees: { lat: 43.2147, lng: 5.5391 },
    description: "Face aux pointus et à la falaise des Calanques, les pieds dans la Méditerranée.",
    ouvert: true,
    horaires: [/* à compléter */],
    fourchettePrix: '€€',
    cuisines: ['Méditerranéenne', 'Provençale', 'Poissons & fruits de mer'],
    fermetureHebdo: [],
    photoHero: '/images/maisons/cassis/hero.jpg',
    photos: [],
    accent: '#5C8170', // vert d'eau
    reservationUrl: '',
  },
  {
    slug: 'villeneuve-loubet',
    nom: 'Villeneuve-Loubet',
    label: 'Côte d\'Azur',
    adresse: 'Adresse à confirmer',
    codePostal: '06270',
    ville: 'Villeneuve-Loubet',
    pays: 'FR',
    telephone: '+33625151333',
    telephoneAffichage: '06 25 15 13 33',
    coordonnees: { lat: 43.6500, lng: 7.1167 },
    description: "Notre nouvelle maison azuréenne, entre mer et arrière-pays niçois.",
    ouvert: false,
    badgeOuverture: 'Nouveau',
    horaires: [],
    fourchettePrix: '€€',
    cuisines: ['Méditerranéenne', 'Provençale', 'Niçoise'],
    fermetureHebdo: [],
    photoHero: '/images/maisons/villeneuve-loubet/hero.jpg',
    photos: [],
    accent: '#C49960', // or chaud
    reservationUrl: '',
  },
];
```

Le type `Maison` correspondant doit être créé dans `src/types/maison.ts` avec validation Zod en bonus (`maisonSchema` exporté).

## Design system

Variables CSS à déclarer dans `globals.css` (palette validée du prototype) :

```css
:root {
  --cream: #F4ECDD;
  --cream-soft: #EFE5D2;
  --ink: #1F2218;
  --ink-soft: #2A2E20;
  --gold: #D4AF6E;
  --gold-deep: #8B6F3A;
  --gold-light: #E8D5A8;
  --olive: #4A5530;
  --text-muted: #6B5D4A;
  --text-soft: #C8B79A;
}
```

À exposer dans `tailwind.config.ts` via `extend.colors.brand`. Polices : Cormorant Garamond (serif, italiques utilisés en accent) + Inter (sans, par défaut).

**Spacing typographique** :
- Hero : `clamp(48px, 7vw, 92px)` pour le H1, line-height 1, letter-spacing -1.5px
- Section title : `clamp(36px, 4.5vw, 52px)`
- Eyebrows : 11-12px, letter-spacing 2.5-3px, text-transform uppercase, color gold

## SEO et structured data

Sur **chaque page de maison**, injecter un JSON-LD `Restaurant` complet avec :
- `@type: Restaurant`
- `name`, `address` (PostalAddress complet), `telephone`, `geo` (GeoCoordinates)
- `openingHoursSpecification` (typé jour par jour)
- `servesCuisine` (array)
- `priceRange`
- `image` (URL absolue), `url` (canonique)
- `aggregateRating` à laisser commenté tant que pas de source fiable

Composant réutilisable `RestaurantJsonLd.tsx` qui prend un `Maison` en prop et produit le JSON-LD via `<script type="application/ld+json">`.

`generateMetadata` sur chaque page :
- Title : `"Maison Oléa Marseille — Restaurant méditerranéen Vieux-Port"`
- Description : 150-160 caractères, naturelle, contenant le mot-clé local
- Open Graph + Twitter Card complets
- `alternates.canonical`

Sitemap dynamique généré depuis `maisons.ts` + pages statiques.

## Réservation

Pour la v1, **deux options** activables par maison via la donnée :
1. Si `reservationUrl` présent → bouton "Réserver" qui ouvre dans un nouvel onglet (TheFork / Zenchef widget intégré en iframe sur la page d'adresse)
2. Sinon → `tel:` direct sur le téléphone

Pas d'engagement immédiat sur TheFork — le code doit juste être prêt à l'accueillir.

## Formulaire devis privatisation

Route API `/api/devis` qui :
- Valide le payload avec Zod (nom, email, téléphone, maison choisie, type d'événement, nombre de convives, date souhaitée, message)
- Envoie un email à `contact@olea-restaurant.fr` via Resend ou Nodemailer (configurable via `.env`)
- Retourne 200/400 avec message structuré
- Log toutes les soumissions avec Pino (sans PII en clair)

## Performance et qualité

- Lighthouse cible : **95+** sur Performance, Accessibility, Best Practices, SEO en production
- Images en WebP/AVIF, dimensions explicites, `priority` sur le hero uniquement
- Pas de bibliothèque d'animation lourde (Framer Motion seulement si nécessaire pour 1-2 transitions clés)
- Pas de tracking par défaut, **bannière cookies seulement si analytics ajouté**
- Tester l'accessibilité au clavier avant push

## Livrables attendus de cette première session

1. Bootstrap complet : Next.js installé, Tailwind configuré, shadcn initialisé, fonts chargées
2. `CLAUDE.md` à la racine avec les règles ci-dessus
3. `src/data/maisons.ts` + `src/types/maison.ts` (avec schéma Zod)
4. Layout root avec header transparent-puis-opaque au scroll et footer 4 colonnes
5. **Homepage complète** fidèle au prototype (les 6 sections : Hero, Pillars, MaisonsGrid, Esprit, PrivatReserv, et le footer)
6. Au minimum la **page Marseille** comme template des deux autres pages d'adresse, avec JSON-LD fonctionnel
7. `sitemap.ts` + `robots.ts`
8. README à jour avec : prérequis, commandes (`pnpm dev`, `pnpm build`, `pnpm lint`), variables d'env nécessaires
9. Tout commité en Conventional Commits avec messages clairs, sur la branche `main` ou via PR si pipeline préfère

## Hors scope v1 (à ne pas faire maintenant)

- Carte/menu détaillé (placeholder suffit, page créée mais vide)
- Système de réservation natif (juste préparer l'intégration)
- Multilingue (FR uniquement pour la v1, mais structurer l'app pour le permettre plus tard via `[locale]`)
- Blog / actualités
- Espace client / fidélité
- Tracking analytics (à ajouter en v1.1)

## Ton de la copywriting

Conserver le ton du site actuel (chaleureux, méditerranéen, "Maison" évoquant la famille et le partage). Reprendre fidèlement les phrases clés du prototype :
- Hero : "La Méditerranée, à votre table."
- Tagline : "Trois maisons, un même geste : célébrer la lumière du Sud à travers une cuisine sincère et le partage."
- Esprit : "Une cuisine née du soleil et de la terre."
- Privatisation : "Vos célébrations, à notre table."

**Ne pas inventer** d'avis clients, d'étoiles, de récompenses, ou d'histoires sur le chef tant que le client n'a pas fourni le contenu validé.

---

**Démarre maintenant par** : `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`. Puis enchaîne dans l'ordre du livrable.

Pose-moi tes questions si une donnée manque (notamment coordonnées GPS exactes, horaires précis, photos disponibles). Sinon, code.
