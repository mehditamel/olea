import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Si fourni, le symbole devient signifiant (sinon `aria-hidden`). */
  title?: string;
};

/**
 * Symbole de marque Oléa : le « O » incliné et épuré de la charte (favicon,
 * estampilles, marques secondaires). Anneau en `currentColor` sur fond
 * transparent → tintable via `text-brand-*`. Décoratif par défaut.
 */
export function OleaSymbol({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("inline-block", className)}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g transform="rotate(-12 16 16)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6,16 a10,11 0 1,0 20,0 a10,11 0 1,0 -20,0 z M10.8,16 a5.2,9.4 0 1,0 10.4,0 a5.2,9.4 0 1,0 -10.4,0 z"
        />
      </g>
    </svg>
  );
}
