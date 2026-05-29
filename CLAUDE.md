@AGENTS.md

# CLAUDE.md — Règles d'ingénierie Maison Oléa

Référentiel non-négociable pour toute contribution au site `olea-restaurant.fr`. Ces règles priment sur les conventions par défaut des outils utilisés.

## Stack

- Next.js 16 (App Router, Server Components par défaut)
- React 19
- TypeScript strict (`strict: true`, `noUncheckedIndexedAccess: true`)
- Tailwind CSS v4 (CSS-first via `@theme` dans `globals.css`)
- shadcn/ui pour les primitives interactives
- Zod pour la validation des frontières (formulaires, API)
- Pino pour les logs côté serveur
- Resend pour l'envoi d'emails (fallback log Pino si `RESEND_API_KEY` absent)

## TypeScript

- Aucun `any`. Utiliser `unknown` puis narrow par type guard, ou typer correctement à la source.
- `noUncheckedIndexedAccess` est activé : les accès par index renvoient `T | undefined`, gérer explicitement le cas undefined.
- Pas de `// @ts-ignore` ni `// @ts-expect-error` sauf cas extrême documenté en commentaire (1 ligne).

## Architecture

- **Server Components par défaut**. `'use client'` uniquement si nécessaire (interactivité, hooks navigateur, `useState`, `useEffect`).
- **Source unique de vérité** pour les données des 3 maisons : `src/data/maisons.ts`. Tout composant qui affiche des infos de maison doit l'importer, jamais hardcoder.
- **Pas de fichier > 300 lignes**. Découper en sous-composants si dépassement.
- **Composants** : PascalCase, un composant par fichier, nom du fichier == nom du composant.
- **Hooks** : camelCase, préfixés `use`.

## Style / Tailwind

- **Mobile-first** : commencer par les classes sans breakpoint, puis ajouter `md:` / `lg:`.
- Tokens de couleurs dans `globals.css` via `@theme` — utiliser `bg-brand-cream`, `text-brand-ink`, `text-brand-gold`, `text-brand-olive`, `text-brand-sage`, etc.
- **Palette = charte Oléa Group 2026** : vert olive `#75774A` (signature/ADN), vert sauge `#E2E3BC` (équilibre → `brand-sage`), blanc cassé `#FEFFEB` (respiration → `brand-cream`), sable clair `#ECBB6E` (complémentaire chaude → `brand-gold`). Vert profond `#344824` pour fonds/overlays.
- Pas de CSS module sauf cas exceptionnel.
- Préfixer les classes longues complexes via un helper `cn()` (déjà disponible dans `src/lib/utils.ts`).

## Accessibilité (a11y)

- `alt` sur toutes les images (vide `alt=""` seulement si purement décoratif).
- Focus visible sur tous les éléments interactifs (ring tailwind par défaut).
- Contraste AAA sur les textes longs, AA minimum partout.
- Navigation clavier complète (tab, enter, escape sur les modaux).
- Landmarks sémantiques : `<header>`, `<main>`, `<footer>`, `<nav>`.

## SEO

- `generateMetadata` exporté sur chaque page (title, description 150-160 char, OG, Twitter, canonical).
- JSON-LD `Restaurant` sur chaque page d'adresse (via `<RestaurantJsonLd />`).
- Sitemap dynamique généré depuis `maisons.ts`.
- `robots.ts` configuré.

## Commits

- Conventional Commits : `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `test:`.
- Sujet < 72 caractères, à l'impératif.
- Pas de commit géant : un commit = une intention.

## Données sensibles

- Pas de PII en clair dans les logs.
- Variables sensibles via env (`.env.local`, jamais commité). Voir `.env.example`.
- Pas de localStorage côté client si non nécessaire fonctionnellement.

## Vérification avant push

1. `pnpm lint` → 0 erreur.
2. `pnpm build` → succès.
3. Test manuel sur viewports 375px, 768px, 1280px.
4. Tab clavier sur la page modifiée.

## Brand

- **Marque commerciale** : « Maison Oléa ». Signature courte : « Oléa ».
- **Palette dominante** : vert olive signature `#75774A` (ADN Oléa : Méditerranée, olivier, authenticité). Vert sauge `#E2E3BC` en équilibre, sable clair `#ECBB6E` et blanc cassé `#FEFFEB` en accents/respiration. Conforme à la charte graphique Oléa Group 2026 (« Les couleurs du Sud »).
- **Typo** : Jost (substitut libre de **Coco Gothic** de la charte — sans géométrique, pour titres / corps / structure, via `--font-sans`) + **Libre Baskerville** (serif éditorial, en italique pour sous-titres et accents, via `--font-serif`). Coco Gothic étant commerciale (Zetafonts), Jost la remplace ; fournir les fichiers .woff2 pour passer à Coco Gothic via `next/font/local` si licence acquise.
- **Tone of voice** : chaleureux, méditerranéen, « Maison » évoquant la famille et le partage. Ne pas inventer d'avis, étoiles, récompenses, ou récits sur le chef sans contenu validé.
