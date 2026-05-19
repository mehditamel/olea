type Props = {
  word?: "Oléa" | "Maison Oléa";
  className?: string;
};

/**
 * Renders the brand name with `lang="fr"` so screen readers and TTS engines
 * pronounce it as French regardless of the surrounding page language.
 */
export function BrandWord({ word = "Oléa", className }: Props) {
  return (
    <span lang="fr" className={className}>
      {word}
    </span>
  );
}
