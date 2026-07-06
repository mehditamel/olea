/**
 * IP du client derrière le proxy Vercel/CDN, pour le rate limiting.
 * Ne pas utiliser à des fins d'identification : spoofable hors proxy de confiance.
 */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
