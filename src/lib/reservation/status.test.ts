import { describe, expect, it } from "vitest";
import {
  ACTIVE_STATUTS,
  RESERVATION_STATUTS,
  isActiveStatut,
} from "./status";

describe("isActiveStatut", () => {
  it("considère les réservations en attente de carte et confirmées comme actives", () => {
    expect(isActiveStatut("pending_card")).toBe(true);
    expect(isActiveStatut("confirmed")).toBe(true);
  });

  it("considère les statuts terminaux comme inactifs", () => {
    expect(isActiveStatut("cancelled_by_client")).toBe(false);
    expect(isActiveStatut("cancelled_by_staff")).toBe(false);
    expect(isActiveStatut("noshow")).toBe(false);
    expect(isActiveStatut("honored")).toBe(false);
    expect(isActiveStatut("expired")).toBe(false);
  });

  it("garde ACTIVE_STATUTS comme sous-ensemble des statuts connus", () => {
    for (const statut of ACTIVE_STATUTS) {
      expect(RESERVATION_STATUTS).toContain(statut);
    }
  });
});
