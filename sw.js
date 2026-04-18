// WOT BOOSTED Service Worker
const CACHE_VERSION = 'wot-boosted-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/logo.png',
  '/manifest.json'
];

// Установка — кэшируем базовые файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Активация — удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Стратегия: Network First для HTML, Cache First для ассетов
self.addEventListener('fetch', event => {
  const { request } = event;

  // Только GET запросы
  if (request.method !== 'GET') return;

  // Внешние домены (шрифты Google, Telegram etc.) — пропускаем
  if (!request.url.startsWith(self.location.origin)) return;

  const url = new URL(request.url);
  const isHTML = request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/';

  if (isHTML) {
    // Network first для HTML — всегда свежий контент
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Cache first для картинок, шрифтов, js, css
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
  }
});
