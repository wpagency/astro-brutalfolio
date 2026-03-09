// Service Worker for wpagency.xyz
// Version: 1.0.0 - Update version when changing cache strategy
const CACHE_VERSION = '1.0.0';
const CACHE_NAME = 'wpagency-v' + CACHE_VERSION;
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        // Handle installation errors gracefully
      })
  );
});

// Activate event - clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !cacheName.startsWith('wpagency-v' + CACHE_VERSION))
          .map((cacheName) => {
            try {
              return caches.delete(cacheName);
            } catch (err) {
              // Gracefully handle cache deletion errors
            }
          })
      );
    }).then(() => self.clients.claim())
      .catch((err) => {
        // Handle activation errors gracefully
      })
  );
});

// Fetch event - Network first for navigation, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Network first strategy for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              })
              .catch((err) => {
                // Gracefully handle caching errors
              });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cached version if network fails
          return caches.match(request)
            .catch(() => {
              // Return offline page if available
              return new Response('Offline - Please check your connection', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
        })
    );
  } else {
    // Cache first strategy for assets with network fallback
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }

          return fetch(request)
            .then((fetchResponse) => {
              // Only cache successful responses
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'error') {
                return fetchResponse;
              }

              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                })
                .catch((err) => {
                  // Gracefully handle caching errors
                });

              return fetchResponse;
            })
            .catch(() => {
              // Network request failed, return error response
              return new Response('Network request failed', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
        .catch((err) => {
          // Cache lookup failed, return error response
          return new Response('Cache lookup failed', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
    );
  }
});