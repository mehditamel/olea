import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { makeMaison } from "@/test/maison-fixture";
import {
  getHoraireForDate,
  getServiceForSlot,
  getSlotsForDate,
  isMaisonClosedOn,
} from "./reservation-slots";

const maison = makeMaison({
  fermeturesExceptionnelles: ["2026-01-02"],
  horaires: [
    // vendredi : déjeuner + dîner ; samedi : dîner seul.
    { jour: "vendredi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
    { jour: "samedi", dejeuner: null, diner: "19:00-22:30" },
  ],
});

beforeEach(() => {
  // Gèle "maintenant" pour neutraliser le filtre des dates passées.
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T08:00:00+01:00")); // jeudi matin
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getSlotsForDate", () => {
  it("génère les créneaux déjeuner et dîner avec un dernier départ borné", () => {
    // 2026-01-03 = samedi → dîner uniquement (pas de fermeture exceptionnelle).
    const slots = getSlotsForDate(maison, "2026-01-03");
    expect(slots.every((s) => s.service === "diner")).toBe(true);
    // 19:00 → dernier départ 21:30 (clôture 22:30 − 60 min), pas de 22:00.
    expect(slots.map((s) => s.value)).toEqual([
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ]);
    expect(slots[0]?.label).toBe("19h00");
  });

  it("renvoie une liste vide sur une fermeture exceptionnelle", () => {
    expect(getSlotsForDate(maison, "2026-01-02")).toEqual([]);
  });

  it("renvoie une liste vide sur une date passée", () => {
    expect(getSlotsForDate(maison, "2025-12-31")).toEqual([]);
  });

  it("renvoie une liste vide un jour sans horaire", () => {
    // 2026-01-04 = dimanche, absent des horaires.
    expect(getSlotsForDate(maison, "2026-01-04")).toEqual([]);
  });
});

describe("isMaisonClosedOn / getHoraireForDate", () => {
  it("détecte une fermeture exceptionnelle", () => {
    expect(isMaisonClosedOn(maison, "2026-01-02")).toBe(true);
    expect(isMaisonClosedOn(maison, "2026-01-03")).toBe(false);
  });

  it("ne renvoie aucun horaire un jour fermé", () => {
    expect(getHoraireForDate(maison, "2026-01-02")).toBeNull();
    expect(getHoraireForDate(maison, "2026-01-03")?.jour).toBe("samedi");
  });
});

describe("getServiceForSlot", () => {
  it("retrouve le service correspondant à un créneau valide", () => {
    expect(getServiceForSlot(maison, "2026-01-03", "19:30")).toBe("diner");
  });

  it("renvoie null pour un créneau hors plage", () => {
    expect(getServiceForSlot(maison, "2026-01-03", "23:00")).toBeNull();
  });
});
