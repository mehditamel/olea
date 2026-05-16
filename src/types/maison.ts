import { z } from "zod";

export const maisonSlugSchema = z.enum([
  "marseille",
  "cassis",
  "villeneuve-loubet",
]);
export type MaisonSlug = z.infer<typeof maisonSlugSchema>;

export const jourSchema = z.enum([
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
]);
export type Jour = z.infer<typeof jourSchema>;

export const coordonneesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
export type Coordonnees = z.infer<typeof coordonneesSchema>;

export const horaireSchema = z.object({
  jour: jourSchema,
  dejeuner: z
    .string()
    .regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/)
    .nullable(),
  diner: z
    .string()
    .regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/)
    .nullable(),
});
export type Horaire = z.infer<typeof horaireSchema>;

export const maisonSchema = z.object({
  slug: maisonSlugSchema,
  nom: z.string().min(1),
  label: z.string().min(1),
  adresse: z.string().min(1),
  codePostal: z.string().regex(/^\d{5}$/),
  ville: z.string().min(1),
  pays: z.literal("FR"),
  telephone: z.string().regex(/^\+\d{6,15}$/),
  telephoneAffichage: z.string().min(1),
  coordonnees: coordonneesSchema,
  description: z.string().min(1),
  ouvert: z.boolean(),
  dateOuverture: z.string().optional(),
  badgeOuverture: z.string().optional(),
  horaires: z.array(horaireSchema),
  fourchettePrix: z.enum(["€", "€€", "€€€", "€€€€"]),
  cuisines: z.array(z.string()).min(1),
  fermetureHebdo: z.array(jourSchema),
  fermeturesExceptionnelles: z
    .array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
    .optional(),
  photoHero: z.string(),
  photos: z.array(z.string()),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  reservationUrl: z.string().url().or(z.literal("")),
});
export type Maison = z.infer<typeof maisonSchema>;
