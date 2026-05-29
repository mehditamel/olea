import { describe, expect, it } from "vitest";
import { makeMaison } from "@/test/maison-fixture";
import { getMaisonStatus } from "./horaires";

const maison = makeMaison({
  horaires: [
    { jour: "vendredi", dejeuner: "12:00-14:30", diner: "19:00-22:30" },
  ],
});

// 2026-01-02 = vendredi. Paris est en UTC+1 en janvier (CET).
const at = (iso: string) => new Date(iso);

describe("getMaisonStatus", () => {
  it("renvoie unknown quand la maison est fermée définitivement", () => {
    const fermee = makeMaison({ ouvert: false });
    expect(getMaisonStatus(fermee, at("2026-01-02T12:30:00+01:00")).state).toBe(
      "unknown",
    );
  });

  it("renvoie unknown sans horaires", () => {
    const sansHoraires = makeMaison({ horaires: [] });
    expect(getMaisonStatus(sansHoraires, at("2026-01-02T12:30:00+01:00")).state).toBe(
      "unknown",
    );
  });

  it("signale ouvert pendant le service", () => {
    const status = getMaisonStatus(maison, at("2026-01-02T12:30:00+01:00"));
    expect(status).toEqual({
      state: "open",
      closesAt: "14:30",
      closingSoon: false,
    });
  });

  it("signale une fermeture imminente dans les 30 dernières minutes", () => {
    const status = getMaisonStatus(maison, at("2026-01-02T14:15:00+01:00"));
    expect(status.state).toBe("open");
    if (status.state === "open") {
      expect(status.closingSoon).toBe(true);
    }
  });

  it("propose le prochain service le même jour entre deux services", () => {
    const status = getMaisonStatus(maison, at("2026-01-02T16:00:00+01:00"));
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.nextOpen?.jour).toBe("vendredi");
      expect(status.nextOpen?.opens).toBe("19:00");
      expect(status.nextOpen?.isTomorrow).toBe(false);
    }
  });
});
