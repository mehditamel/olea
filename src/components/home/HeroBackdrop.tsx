"use client";

import { useEffect, useRef } from "react";
import { OliveBranch } from "@/components/brand/OliveBranch";

export function HeroBackdrop() {
  const sunRef = useRef<HTMLDivElement | null>(null);
  const branchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sun = sunRef.current;
    const branch = branchRef.current;
    if (!sun || !branch) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let latestY = window.scrollY;
    let scheduled = false;

    const apply = () => {
      const y = Math.min(latestY, 600);
      sun.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      branch.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
      scheduled = false;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (!scheduled) {
        scheduled = true;
        rafId = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={sunRef}
        className="absolute start-[10%] top-[22%] w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full opacity-40 blur-[3px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, #E8D5A8 0%, #8B6F3A 60%, #3D2F18 100%)",
        }}
      />
      <div
        ref={branchRef}
        className="absolute end-[4%] bottom-[18%] md:bottom-[12%] will-change-transform"
      >
        <OliveBranch className="w-[160px] md:w-[240px] h-auto text-brand-cream opacity-25" />
      </div>
    </>
  );
}
