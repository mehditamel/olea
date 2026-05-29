import { describe, expect, it } from "vitest";
import {
  isIsoDateInPastParis,
  jourFromIsoParis,
  todayIsoParis,
} from "./date-paris";

// Repères connus (1er janvier 2026 = jeudi).
describe("jourFromIsoParis", () => {
  it("mappe une date ISO sur le bon jour de la semaine", () => {
    expect(jourFromIsoParis("2026-01-01")).toBe("jeudi");
    expect(jourFromIsoParis("2026-01-02")).toBe("vendredi");
    expect(jourFromIsoParis("2026-01-03")).toBe("samedi");
    expect(jourFromIsoParis("2026-01-04")).toBe("dimanche");
    expect(jourFromIsoParis("2026-01-05")).toBe("lundi");
  });

  it("renvoie null pour un format invalide", () => {
    expect(jourFromIsoParis("pas-une-date")).toBeNull();
    expect(jourFromIsoParis("2026/01/02")).toBeNull();
    expect(jourFromIsoParis("")).toBeNull();
  });
});

describe("isIsoDateInPastParis", () => {
  it("considère une date clairement passée comme passée", () => {
    expect(isIsoDateInPastParis("2000-01-01")).toBe(true);
  });

  it("ne considère pas une date lointaine comme passée", () => {
    expect(isIsoDateInPastParis("2999-12-31")).toBe(false);
  });

  it("traite un format invalide comme passé (garde-fou)", () => {
    expect(isIsoDateInPastParis("bad")).toBe(true);
  });
});

describe("todayIsoParis", () => {
  it("renvoie une date au format YYYY-MM-DD", () => {
    expect(todayIsoParis()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
