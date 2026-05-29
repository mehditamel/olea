import { describe, expect, it } from "vitest";
import { nextPhotoIndex, prevPhotoIndex } from "./gallery-navigation";

describe("nextPhotoIndex", () => {
  it("avance d'une photo", () => {
    expect(nextPhotoIndex(0, 4)).toBe(1);
    expect(nextPhotoIndex(2, 4)).toBe(3);
  });

  it("revient au début après la dernière", () => {
    expect(nextPhotoIndex(3, 4)).toBe(0);
  });
});

describe("prevPhotoIndex", () => {
  it("recule d'une photo", () => {
    expect(prevPhotoIndex(2, 4)).toBe(1);
  });

  it("repart de la fin avant la première", () => {
    expect(prevPhotoIndex(0, 4)).toBe(3);
  });
});

describe("garde-fous", () => {
  it("reste à 0 sur une galerie vide", () => {
    expect(nextPhotoIndex(0, 0)).toBe(0);
    expect(prevPhotoIndex(0, 0)).toBe(0);
  });

  it("boucle correctement sur une seule photo", () => {
    expect(nextPhotoIndex(0, 1)).toBe(0);
    expect(prevPhotoIndex(0, 1)).toBe(0);
  });
});
