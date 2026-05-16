import { z } from "zod";
import { maisonSlugSchema } from "./maison";

export const typeEvenementSchema = z.enum([
  "anniversaire",
  "mariage",
  "seminaire",
  "repas-affaires",
  "famille",
  "autre",
]);
export type TypeEvenement = z.infer<typeof typeEvenementSchema>;

export const devisSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.email("Email invalide"),
  telephone: z
    .string()
    .trim()
    .regex(/^[\d +().-]{6,20}$/, "Téléphone invalide"),
  maison: maisonSlugSchema,
  typeEvenement: typeEvenementSchema,
  convives: z.number().int().min(2).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide (YYYY-MM-DD)"),
  message: z.string().trim().max(2000).default(""),
});
export type DevisInput = z.input<typeof devisSchema>;
export type DevisOutput = z.output<typeof devisSchema>;
