// Service Worker for offline functionality
const CACHE_NAME = 'necron-portfolio-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/contact.html',
  '/404.html',
  '/css/styles.css',
  '/css/accessibility.css',
  '/css/radical-solution.css',
  '/js/combined.js',
  '/js/resource-optimizer.js',
  '/js/page-preloader.js',
  '/js/performance-monitor.js',
  '/js/project-data.js',
  '/js/project-loader.js',
  '/js/sw-register.js',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Force immediate activation
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control immediately
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          // Update cache in background for HTML files
          if (event.request.mode === 'navigate') {
            event.waitUntil(updateCache(event.request));
          }
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME)
            .then(cache => {
              // Set aggressive cache headers for static assets
              if (event.request.url.match(/\.(js|css|woff2|png|jpg|jpeg|gif|svg|webp)$/)) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Update cache in background
function updateCache(request) {
  return fetch(request).then(response => {
    return caches.open(CACHE_NAME).then(cache => {
      return cache.put(request, response);
    });
  });
}

// Listen for messages
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
