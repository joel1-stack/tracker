// Expense Tracker PWA Service Worker - Enhanced Version
const CACHE_NAME = 'expense-tracker-v1.2';
const OFFLINE_URL = 'index.html';

// Assets to cache on install
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './login.html',
    './dashboard.html',
    './transactions.html',
    './manifest.json',
    'https://img.icons8.com/color/96/000000/money-bag.png',
    'https://img.icons8.com/color/144/000000/money-bag.png',
    'https://img.icons8.com/color/192/000000/money-bag.png',
    'https://img.icons8.com/color/512/000000/money-bag.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Install completed');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Install failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - Network first, then cache strategy
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip chrome-extension requests
    if (event.request.url.startsWith('chrome-extension://')) return;

    // Handle API requests differently (if you add backend later)
    if (event.request.url.includes('/api/')) {
        event.respondWith(networkFirstStrategy(event.request));
        return;
    }

    // For HTML pages, use cache-first with network fallback
    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        // Update cache in background
                        fetchAndCache(event.request);
                        return cachedResponse;
                    }
                    return fetchAndCache(event.request);
                })
                .catch(() => {
                    // If both fail, show offline page
                    return caches.match(OFFLINE_URL);
                })
        );
        return;
    }

    // For static assets (CSS, JS, images), use cache-first
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Network-first strategy (for dynamic content)
function networkFirstStrategy(request) {
    return fetch(request)
        .then((networkResponse) => {
            // Clone response to cache
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(request, responseToCache);
                });
            return networkResponse;
        })
        .catch(() => {
            // Network failed, try cache
            return caches.match(request);
        });
}

// Fetch and cache helper
function fetchAndCache(request) {
    return fetch(request)
        .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // Clone and cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(request, responseToCache);
                });

            return response;
        })
        .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            throw error;
        });
}

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New expense tracking update!',
        icon: 'https://img.icons8.com/color/96/000000/money-bag.png',
        badge: 'https://img.icons8.com/color/96/000000/money-bag.png',
        vibrate: [100, 50, 100],
        data: {
            url: '/dashboard.html'
        },
        actions: [
            {
                action: 'open',
                title: 'Open App'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Expense Tracker', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // If a window is already open, focus it
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// Background sync (future feature)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-expenses') {
        console.log('[Service Worker] Background sync started');
        event.waitUntil(syncExpenses());
    }
});

function syncExpenses() {
    // This would sync with a backend server
    return new Promise((resolve) => {
        console.log('[Service Worker] Syncing data...');
        setTimeout(() => {
            console.log('[Service Worker] Sync completed');
            resolve();
        }, 1000);
    });
}

// Handle offline/online events
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});