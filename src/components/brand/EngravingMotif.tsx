import { cn } from "@/lib/utils";

type Motif = "sun" | "olive" | "octopus";

const MOTIF_SRC: Record<Motif, string> = {
  sun: "/images/brand/icons/sun.png",
  olive: "/images/brand/icons/olive.png",
  octopus: "/images/brand/icons/octopus.png",
};

type Props = {
  motif: Motif;
  className?: string;
};

/**
 * Iconographie gravure de la charte Oléa (soleil, olivier, poulpe).
 * Rendu via masque CSS sur une boîte colorée → tintable par token
 * `text-brand-*` (comme `currentColor`), lisible sur fond clair comme sombre.
 * Taille / position / opacité fournies par l'appelant. Purement décoratif →
 * `aria-hidden`.
 */
export function EngravingMotif({ motif, className }: Props) {
  const src = MOTIF_SRC[motif];
  const mask = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  } as const;

  return (
    <span aria-hidden className={cn("block bg-current", className)} style={mask} />
  );
}
