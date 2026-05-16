type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

/**
 * Sliding-window in-memory rate limit. Best-effort: ne survit pas aux redémarrages
 * et ne se synchronise pas entre instances. Suffisant comme première barrière
 * anti-abus avant un éventuel passage sur KV/Upstash.
 */
export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  const cutoff = now - options.windowMs;
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= options.limit) {
    const oldest = bucket.hits[0] ?? now;
    buckets.set(key, bucket);
    return { ok: false, retryAfterMs: oldest + options.windowMs - now };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { ok: true };
}
