const CACHE_NAME = 'bakery-recipes-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(names.map(n => n !== CACHE_NAME && caches.delete(n))))
  );
});
