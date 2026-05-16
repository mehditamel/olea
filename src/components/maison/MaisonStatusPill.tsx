"use client";

import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { getMaisonStatus, JOUR_LABEL, type MaisonStatus } from "@/lib/horaires";
import { cn } from "@/lib/utils";
import type { Maison } from "@/types/maison";

type Props = {
  maison: Maison;
  variant?: "light" | "dark";
  className?: string;
};

export function MaisonStatusPill({ maison, variant = "dark", className }: Props) {
  const [status, setStatus] = useState<MaisonStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getMaisonStatus(maison, new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [maison]);

  if (!status) return null;
  if (status.state === "unknown") return null;

  const label = formatLabel(status);
  const tone = toneClasses(status, variant);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase font-medium border",
        tone,
        className,
      )}
    >
      <Circle
        className={cn(
          "h-1.5 w-1.5 flex-shrink-0",
          status.state === "open"
            ? status.closingSoon
              ? "fill-amber-400 text-amber-400"
              : "fill-emerald-400 text-emerald-400"
            : "fill-current opacity-60",
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}

function formatLabel(status: MaisonStatus): string {
  if (status.state === "open") {
    if (status.closingSoon) return `Ferme à ${status.closesAt}`;
    return `Ouvert · ferme à ${status.closesAt}`;
  }
  if (status.state === "closed") {
    if (!status.nextOpen) return "Fermé";
    if (status.nextOpen.isTomorrow)
      return `Fermé · demain à ${status.nextOpen.opens}`;
    return `Fermé · ${JOUR_LABEL[status.nextOpen.jour].toLowerCase()} à ${status.nextOpen.opens}`;
  }
  return "";
}

function toneClasses(status: MaisonStatus, variant: "light" | "dark"): string {
  if (status.state === "open") {
    if (status.closingSoon) {
      return variant === "dark"
        ? "bg-amber-500/15 border-amber-400/40 text-amber-200"
        : "bg-amber-500/10 border-amber-600/30 text-amber-800";
    }
    return variant === "dark"
      ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-100"
      : "bg-emerald-600/10 border-emerald-700/30 text-emerald-800";
  }
  return variant === "dark"
    ? "bg-brand-cream/8 border-brand-cream/20 text-brand-cream/85"
    : "bg-brand-ink/8 border-brand-ink/20 text-brand-ink/70";
}
