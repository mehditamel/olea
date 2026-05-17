// Maison Oléa — Service Worker minimaliste.
// Stratégie : network-first sur HTML (fallback offline localisé), cache-first sur assets statiques.

const CACHE_VERSION = "olea-v2";
const LOCALES = ["fr", "en", "it", "es", "pt", "ru", "ar"];
const DEFAULT_LOCALE = "fr";
const OFFLINE_PAGES = LOCALES.map((l) => `/${l}/offline`);
const APP_SHELL = [
  ...OFFLINE_PAGES,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_VERSION)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function offlineUrlForRequest(request) {
  try {
    const url = new URL(request.url);
    const first = url.pathname.split("/")[1] || "";
    if (LOCALES.includes(first)) return `/${first}/offline`;
  } catch {
    /* noop */
  }
  return `/${DEFAULT_LOCALE}/offline`;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_VERSION);
        const target = offlineUrlForRequest(request);
        const offline = (await cache.match(target)) ??
          (await cache.match(`/${DEFAULT_LOCALE}/offline`));
        return (
          offline ??
          new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          })
        );
      }),
    );
    return;
  }

  if (
    sameOrigin &&
    (url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/icons/"))
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      }),
    );
    return;
  }
});
