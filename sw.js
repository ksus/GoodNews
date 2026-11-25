/* GoodNews – Service Worker: pełna praca offline.
   Przy zmianie jakiegokolwiek pliku podnieś VERSION, aby urządzenia pobrały nową wersję. */
const VERSION = "1.0.3";
const CACHE = "goodnews-" + VERSION;

const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(a => new Request(a, { cache: "reload" }))))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("goodnews-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // linki zewnętrzne (np. thefour.com) – bez cache

  // Nawigacja: sieć najpierw nie jest potrzebna – serwuj zapisany index.html
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("index.html").then(hit => hit || fetch(req)).catch(() => caches.match("./"))
    );
    return;
  }

  // Zasoby: cache najpierw, w tle odświeżanie
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
