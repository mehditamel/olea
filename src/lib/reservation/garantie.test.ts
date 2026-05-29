import { describe, expect, it } from "vitest";
import {
  GARANTIE_MONTANT_CENTS_PAR_PERSONNE,
  SEUIL_CONVIVES_GARANTIE,
  montantGarantieCents,
  requiresGarantie,
} from "./garantie";

// Repères connus : 2026-01-02 = vendredi, 03 = samedi, 04 = dimanche, 06 = mardi.
describe("requiresGarantie", () => {
  it("exige une garantie le vendredi, samedi et dimanche", () => {
    expect(requiresGarantie("2026-01-02", 2)).toBe(true);
    expect(requiresGarantie("2026-01-03", 2)).toBe(true);
    expect(requiresGarantie("2026-01-04", 2)).toBe(true);
  });

  it("n'exige pas de garantie en semaine sous le seuil de convives", () => {
    expect(requiresGarantie("2026-01-06", SEUIL_CONVIVES_GARANTIE - 1)).toBe(
      false,
    );
    expect(requiresGarantie("2026-01-01", 2)).toBe(false); // jeudi
  });

  it("exige une garantie dès le seuil de convives, même en semaine", () => {
    expect(requiresGarantie("2026-01-06", SEUIL_CONVIVES_GARANTIE)).toBe(true);
    expect(requiresGarantie("2026-01-06", SEUIL_CONVIVES_GARANTIE + 4)).toBe(
      true,
    );
  });

  it("ne plante pas et n'exige rien sur une date invalide sous le seuil", () => {
    expect(requiresGarantie("date-invalide", 2)).toBe(false);
  });
});

describe("montantGarantieCents", () => {
  it("est proportionnel au nombre de convives", () => {
    expect(montantGarantieCents(1)).toBe(GARANTIE_MONTANT_CENTS_PAR_PERSONNE);
    expect(montantGarantieCents(4)).toBe(
      4 * GARANTIE_MONTANT_CENTS_PAR_PERSONNE,
    );
  });
});
