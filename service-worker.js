const CACHE_NAME = 'akiya-crisis-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/images/logo-192x192.png',
  '/images/logo-512x512.png',
  '/images/banner.jpg',
  '/images/akiya1.jpg',
  '/images/akiya2.jpg',
  '/images/akiya3.jpg',
  '/offline.html',
  '/fonts/your-font.woff2' // Add any custom fonts if used
];

// INSTALL: Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(urlsToCache);
    })
  );
});

// FETCH: Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or attempt fetch
      return response || fetch(event.request).catch(() => {
        // Fallback for HTML pages when offline
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

// ACTIVATE: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!cacheWhitelist.includes(name)) {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});
