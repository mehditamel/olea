import { z } from "zod";
import { LOCALES, type Locale } from "@/i18n/config";

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

export const instagramProfileSchema = z.object({
  handle: z.string().regex(/^[a-z0-9._]+$/),
  url: z.string().url().optional(),
});
export type InstagramProfile = z.infer<typeof instagramProfileSchema>;

const localizedStringShape = Object.fromEntries(
  LOCALES.map((l) => [l, z.string().min(1)]),
) as Record<Locale, z.ZodString>;
export const localizedStringSchema = z.object(localizedStringShape);
export type LocalizedString = z.infer<typeof localizedStringSchema>;

const localizedStringArrayShape = Object.fromEntries(
  LOCALES.map((l) => [l, z.array(z.string().min(1)).min(1)]),
) as Record<Locale, z.ZodArray<z.ZodString>>;
export const localizedStringArraySchema = z.object(localizedStringArrayShape);
export type LocalizedStringArray = z.infer<typeof localizedStringArraySchema>;

export const maisonSchema = z.object({
  slug: maisonSlugSchema,
  nom: z.string().min(1),
  label: localizedStringSchema,
  adresse: z.string().min(1),
  codePostal: z.string().regex(/^\d{5}$/),
  ville: z.string().min(1),
  pays: z.literal("FR"),
  telephone: z.string().regex(/^\+\d{6,15}$/),
  telephoneAffichage: z.string().min(1),
  coordonnees: coordonneesSchema,
  description: localizedStringSchema,
  ouvert: z.boolean(),
  dateOuverture: z.string().optional(),
  badgeOuverture: localizedStringSchema.optional(),
  horaires: z.array(horaireSchema),
  fourchettePrix: z.enum(["€", "€€", "€€€", "€€€€"]),
  cuisines: localizedStringArraySchema,
  fermetureHebdo: z.array(jourSchema),
  fermeturesExceptionnelles: z
    .array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
    .optional(),
  photoHero: z.string(),
  photos: z.array(z.string()),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  reservationUrl: z.string().url().or(z.literal("")),
  instagram: instagramProfileSchema.optional(),
});
export type Maison = z.infer<typeof maisonSchema>;
