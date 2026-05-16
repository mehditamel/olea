import { z } from "zod";
import { maisonSlugSchema } from "./maison";

export const occasionSchema = z.enum([
  "aucune",
  "anniversaire",
  "romantique",
  "famille",
  "professionnel",
  "autre",
]);
export type Occasion = z.infer<typeof occasionSchema>;

export const serviceSchema = z.enum(["dejeuner", "diner"]);
export type Service = z.infer<typeof serviceSchema>;

// Téléphone FR : +33[1-9]NNNNNNNN ou 0[1-9]NNNNNNNN, séparateurs espace/./- tolérés.
const TELEPHONE_FR_REGEX =
  /^(?:(?:\+33|0)\s?[1-9])(?:[\s.\-]?\d{2}){4}$/;

export const reservationSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.email("Email invalide"),
  telephone: z
    .string()
    .trim()
    .regex(TELEPHONE_FR_REGEX, "Numéro de téléphone français invalide"),
  maison: maisonSlugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide (YYYY-MM-DD)"),
  heure: z.string().regex(/^\d{2}:\d{2}$/, "Heure invalide (HH:MM)"),
  service: serviceSchema,
  convives: z.number().int().min(1).max(12),
  occasion: occasionSchema.default("aucune"),
  demandesParticulieres: z.string().trim().max(1000).default(""),
  consentement: z
    .boolean()
    .refine((v) => v === true, "Vous devez accepter pour continuer."),
  // Honeypot : invisible aux humains. La route gère le rejet silencieux si rempli.
  siteWeb: z.string().max(200).optional(),
});
export type ReservationInput = z.input<typeof reservationSchema>;
export type ReservationOutput = z.output<typeof reservationSchema>;
