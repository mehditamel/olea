import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit } from "./rate-limit";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("checkRateLimit", () => {
  it("autorise jusqu'à la limite puis refuse", () => {
    const key = "ip-allow-then-block";
    const opts = { limit: 3, windowMs: 60_000 };
    expect(checkRateLimit(key, opts).ok).toBe(true);
    expect(checkRateLimit(key, opts).ok).toBe(true);
    expect(checkRateLimit(key, opts).ok).toBe(true);

    const blocked = checkRateLimit(key, opts);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
      expect(blocked.retryAfterMs).toBeLessThanOrEqual(opts.windowMs);
    }
  });

  it("réautorise une fois la fenêtre écoulée", () => {
    const key = "ip-window-expiry";
    const opts = { limit: 1, windowMs: 1_000 };
    expect(checkRateLimit(key, opts).ok).toBe(true);
    expect(checkRateLimit(key, opts).ok).toBe(false);

    vi.advanceTimersByTime(1_001);
    expect(checkRateLimit(key, opts).ok).toBe(true);
  });

  it("isole les compteurs par clé", () => {
    const opts = { limit: 1, windowMs: 60_000 };
    expect(checkRateLimit("clef-a", opts).ok).toBe(true);
    expect(checkRateLimit("clef-b", opts).ok).toBe(true);
  });
});
