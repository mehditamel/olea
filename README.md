# Maison Oléa — Site officiel

Site vitrine officiel de **Maison Oléa**, restaurant méditerranéen avec trois maisons :
**Marseille** (maison-mère) · **Cassis** · **Villeneuve-Loubet** (nouvelle ouverture).

Domaine cible : [olea-restaurant.fr](https://olea-restaurant.fr).

## Stack

- **Next.js 16** (App Router, Server Components par défaut)
- **React 19**
- **TypeScript** strict (+ `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** (CSS-first via `@theme`)
- **shadcn/ui** pour les primitives (Button, Sheet…)
- **Zod** pour la validation
- **Pino** pour les logs serveur
- **Resend** pour l'envoi d'emails (avec fallback log)
- **Vercel** pour le déploiement (previews PR activées)

## Prérequis

- Node.js **20+**
- pnpm **9+**

```bash
node --version   # ≥ 20
pnpm --version   # ≥ 9
```

## Démarrer en local

```bash
pnpm install
cp .env.example .env.local   # puis renseigner les variables
pnpm dev                     # http://localhost:3000
```

## Scripts

```bash
pnpm dev      # serveur de développement
pnpm build    # build production
pnpm start    # serveur production (après build)
pnpm lint     # ESLint (next/core-web-vitals)
```

## Variables d'environnement

| Variable | Description | Obligatoire en prod |
|---|---|---|
| `SITE_URL` | URL canonique du site (ex: `https://olea-restaurant.fr`) | oui |
| `RESEND_API_KEY` | Clé Resend pour l'envoi d'emails | oui (sinon log seulement) |
| `RESEND_FROM` | Expéditeur (`Maison Oléa <contact@olea-restaurant.fr>`) | recommandé |
| `CONTACT_EMAIL` | Destinataire des devis | oui |
| `LOG_LEVEL` | Niveau Pino (`debug`, `info`, `warn`, `error`) | non |

En l'absence de `RESEND_API_KEY`, le endpoint `/api/devis` log la demande
via Pino et renvoie un succès en mode `log` — pratique pour le dev local.

## Structure

```
src/
├── app/                # Routes App Router
│   ├── api/devis/      # Endpoint formulaire devis
│   ├── maisons/        # Liste + 3 pages d'adresse
│   ├── carte/          # Placeholder v1
│   ├── privatisation/  # Formulaire devis
│   ├── contact/
│   ├── sitemap.ts      # Sitemap dynamique
│   ├── robots.ts
│   ├── layout.tsx      # Header + Footer
│   └── page.tsx        # Homepage (6 sections)
├── components/
│   ├── layout/         # SiteHeader, SiteFooter, MobileNav
│   ├── home/           # Hero, Pillars, MaisonsGrid, Esprit, PrivatReserv
│   ├── maison/         # MaisonHero, MaisonInfos, MaisonGallery, MaisonReservation
│   ├── devis/          # DevisForm (client)
│   ├── brand/          # OliveBranch (SVG décoratif)
│   ├── seo/            # RestaurantJsonLd
│   └── ui/             # Button, Sheet, Input, Textarea, Label, Select
├── data/
│   ├── maisons.ts      # Source unique de vérité (3 maisons typées)
│   └── menu.ts
├── lib/
│   ├── logger.ts       # Pino
│   ├── email.ts        # Resend wrapper avec fallback log
│   └── utils.ts        # cn(), absoluteUrl(), SITE_URL
└── types/
    ├── maison.ts       # Types + schémas Zod
    └── devis.ts
```

## Conventions

Voir [`CLAUDE.md`](./CLAUDE.md) pour les règles d'ingénierie (TypeScript,
architecture, a11y, SEO, commits, palette).

## SEO

- `generateMetadata` sur chaque page (title, description, OG, canonical).
- JSON-LD `Restaurant` sur chaque page d'adresse (via `<RestaurantJsonLd />`).
- Sitemap dynamique : `/sitemap.xml`.
- Robots : `/robots.txt`.

## Roadmap v1.1

- Photos réelles des trois maisons (remplacer les gradients placeholder).
- Carte / menu détaillé.
- Widget de réservation (TheFork ou Zenchef) intégré sur chaque page d'adresse.
- Tracking analytics + bannière cookies.
- Page mentions légales / CGV.

## Déploiement

Le repo est connecté à Vercel — chaque push sur une branche déclenche une
preview, chaque merge sur `main` déclenche une mise en production.

## Références internes

Les fichiers `docs/` contiennent le brief originel, le prototype HTML, et le BAT
signalétique de Villeneuve-Loubet (référence pour l'identité visuelle).
