import { describe, expect, it } from "vitest";
import { reservationSchema } from "./reservation";

const base = {
  nom: "Jean Dupont",
  email: "jean@example.com",
  telephone: "+33625151333",
  maison: "marseille",
  date: "2026-01-02",
  heure: "19:30",
  service: "diner",
  convives: 4,
  consentement: true,
};

describe("reservationSchema", () => {
  it("accepte une réservation valide et applique les valeurs par défaut", () => {
    const parsed = reservationSchema.parse(base);
    expect(parsed.occasion).toBe("aucune");
    expect(parsed.demandesParticulieres).toBe("");
  });

  it("accepte les formats de téléphone français usuels", () => {
    for (const telephone of [
      "+33625151333",
      "06 25 15 13 33",
      "06.25.15.13.33",
      "0625151333",
    ]) {
      expect(reservationSchema.safeParse({ ...base, telephone }).success).toBe(
        true,
      );
    }
  });

  it("rejette les téléphones invalides", () => {
    for (const telephone of ["12345", "+33012345678", "abcdefghij"]) {
      expect(reservationSchema.safeParse({ ...base, telephone }).success).toBe(
        false,
      );
    }
  });

  it("borne le nombre de convives entre 1 et 12", () => {
    expect(reservationSchema.safeParse({ ...base, convives: 0 }).success).toBe(
      false,
    );
    expect(reservationSchema.safeParse({ ...base, convives: 13 }).success).toBe(
      false,
    );
    expect(reservationSchema.safeParse({ ...base, convives: 1 }).success).toBe(
      true,
    );
    expect(reservationSchema.safeParse({ ...base, convives: 12 }).success).toBe(
      true,
    );
  });

  it("exige le consentement explicite", () => {
    expect(
      reservationSchema.safeParse({ ...base, consentement: false }).success,
    ).toBe(false);
  });

  it("rejette un email et une maison invalides", () => {
    expect(
      reservationSchema.safeParse({ ...base, email: "pas-un-email" }).success,
    ).toBe(false);
    expect(
      reservationSchema.safeParse({ ...base, maison: "paris" }).success,
    ).toBe(false);
  });
});
