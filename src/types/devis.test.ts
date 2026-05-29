import { describe, expect, it } from "vitest";
import { devisSchema } from "./devis";

const base = {
  nom: "Société Exemple",
  email: "contact@example.com",
  telephone: "+33 6 25 15 13 33",
  maison: "cassis",
  typeEvenement: "seminaire",
  convives: 30,
  date: "2026-06-15",
};

describe("devisSchema", () => {
  it("accepte un devis valide et applique le message par défaut", () => {
    const parsed = devisSchema.parse(base);
    expect(parsed.message).toBe("");
  });

  it("borne le nombre de convives entre 2 et 500", () => {
    expect(devisSchema.safeParse({ ...base, convives: 1 }).success).toBe(false);
    expect(devisSchema.safeParse({ ...base, convives: 501 }).success).toBe(
      false,
    );
    expect(devisSchema.safeParse({ ...base, convives: 2 }).success).toBe(true);
    expect(devisSchema.safeParse({ ...base, convives: 500 }).success).toBe(
      true,
    );
  });

  it("rejette un type d'événement inconnu", () => {
    expect(
      devisSchema.safeParse({ ...base, typeEvenement: "concert" }).success,
    ).toBe(false);
  });

  it("rejette un téléphone hors format", () => {
    expect(devisSchema.safeParse({ ...base, telephone: "abc" }).success).toBe(
      false,
    );
  });
});
