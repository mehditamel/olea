/**
 * Navigation cyclique dans une galerie : passe à la photo suivante/précédente
 * en revenant au début/à la fin une fois les bornes atteintes.
 */
export function nextPhotoIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function prevPhotoIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}
