"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "top" | "up" | "down";

/**
 * Suit la direction du scroll vertical avec un seuil pour éviter le flicker.
 * - "top" tant qu'on est en haut (< topThreshold).
 * - "down" après un delta cumulé > delta vers le bas.
 * - "up" après un delta cumulé > delta vers le haut.
 */
export function useScrollDirection(options?: {
  topThreshold?: number;
  delta?: number;
}): ScrollDirection {
  const topThreshold = options?.topThreshold ?? 80;
  const delta = options?.delta ?? 8;

  const [direction, setDirection] = useState<ScrollDirection>("top");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      if (y < topThreshold) {
        setDirection("top");
      } else if (y - lastY > delta) {
        setDirection("down");
      } else if (lastY - y > delta) {
        setDirection("up");
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topThreshold, delta]);

  return direction;
}
