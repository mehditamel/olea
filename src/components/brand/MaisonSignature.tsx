import { cn } from "@/lib/utils";
import { BrandWord } from "./BrandWord";

type Props = {
  /** Nom de la ville/adresse (ex. « Marseille »). */
  ville: string;
  className?: string;
  /** Surcharge du style du libellé ville (capitales espacées par défaut). */
  villeClassName?: string;
};

/**
 * Signature locale de la charte Oléa : logotype « Oléa » (serif) +
 * séparateur + ville en capitales espacées. Reprend les déclinaisons adresse
 * « Oléa · MARSEILLE / CASSIS / VILLENEUVE-LOUBET ». La taille et la couleur
 * sont héritées du contexte (utilisable en kicker comme en titre de hero).
 */
export function MaisonSignature({ ville, className, villeClassName }: Props) {
  return (
    <span className={cn("inline-flex items-baseline gap-[0.4em]", className)}>
      <BrandWord className="font-serif" />
      <span aria-hidden className="font-serif opacity-50">
        ·
      </span>
      <span
        className={cn(
          "font-sans uppercase tracking-[0.2em] text-[0.62em]",
          villeClassName,
        )}
      >
        {ville}
      </span>
    </span>
  );
}
