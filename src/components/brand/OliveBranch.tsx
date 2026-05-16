import { cn } from "@/lib/utils";

type OliveBranchProps = {
  className?: string;
  /** Couleur principale des feuilles. Par défaut cream pour fond sombre. */
  color?: string;
  /** Couleur des olives. */
  fruitColor?: string;
  /** Variante de la branche (sens / densité). */
  variant?: "right" | "left" | "small";
};

/**
 * Motif décoratif inspiré du BAT signalétique de Villeneuve-Loubet.
 * Purement décoratif → `aria-hidden`.
 */
export function OliveBranch({
  className,
  color = "currentColor",
  fruitColor,
  variant = "right",
}: OliveBranchProps) {
  if (variant === "small") {
    return (
      <svg
        viewBox="0 0 80 40"
        className={cn("inline-block", className)}
        fill="none"
        aria-hidden
      >
        <path
          d="M2 22 Q20 14 40 18 Q60 22 78 16"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse cx="14" cy="20" rx="6" ry="2.4" fill={color} transform="rotate(-15 14 20)" />
        <ellipse cx="30" cy="17" rx="6" ry="2.4" fill={color} transform="rotate(-10 30 17)" />
        <ellipse cx="48" cy="18" rx="6" ry="2.4" fill={color} transform="rotate(-5 48 18)" />
        <ellipse cx="64" cy="16" rx="6" ry="2.4" fill={color} transform="rotate(-3 64 16)" />
      </svg>
    );
  }

  const flipX = variant === "left" ? -1 : 1;

  return (
    <svg
      viewBox="0 0 240 280"
      className={cn(className)}
      fill="none"
      aria-hidden
    >
      <g transform={`scale(${flipX} 1) translate(${flipX === -1 ? -240 : 0} 0)`}>
        <path
          d="M55,265 Q65,190 95,150 Q125,110 155,90 Q185,70 215,55"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <ellipse cx="85" cy="180" rx="15" ry="6.5" fill={color} transform="rotate(-30 85 180)" />
        <ellipse cx="115" cy="140" rx="15" ry="6.5" fill={color} transform="rotate(-25 115 140)" />
        <ellipse cx="145" cy="115" rx="15" ry="6.5" fill={color} transform="rotate(-20 145 115)" />
        <ellipse cx="175" cy="90" rx="15" ry="6.5" fill={color} transform="rotate(-15 175 90)" />
        <ellipse cx="100" cy="205" rx="15" ry="6.5" fill={color} transform="rotate(20 100 205)" />
        <ellipse cx="130" cy="165" rx="15" ry="6.5" fill={color} transform="rotate(25 130 165)" />
        <ellipse cx="160" cy="135" rx="15" ry="6.5" fill={color} transform="rotate(30 160 135)" />
        <circle cx="140" cy="155" r="5.5" fill={fruitColor ?? color} opacity={fruitColor ? 1 : 0.5} />
        <circle cx="120" cy="180" r="5.5" fill={fruitColor ?? color} opacity={fruitColor ? 1 : 0.5} />
        <circle cx="162" cy="125" r="5.5" fill={fruitColor ?? color} opacity={fruitColor ? 1 : 0.5} />
      </g>
    </svg>
  );
}
