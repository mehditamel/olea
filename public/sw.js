// Maison Oléa — Service Worker.
// Navigations : network-first avec mémorisation (les pages visitées restent dispo hors-ligne,
// fallback offline localisé sinon). Assets statiques & images : cache-first.

const CACHE_VERSION = "olea-v3";
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
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)),
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

// Mise à jour pilotée par le client : applique le nouveau worker à la demande.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
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

function isCacheableAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/images/")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navigations : network-first, on mémorise la page pour l'hors-ligne.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const clone = response.clone();
            caches
              .open(CACHE_VERSION)
              .then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_VERSION);
          const cached = await cache.match(request);
          if (cached) return cached;
          const target = offlineUrlForRequest(request);
          const offline =
            (await cache.match(target)) ??
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

  // Assets statiques & images : cache-first, puis réseau + mise en cache.
  if (sameOrigin && isCacheableAsset(url)) {
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
