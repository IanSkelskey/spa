const cacheName = 'spa-dashboard-cache-v1';
const assetsToCache = [
	'/',
	'/index.html',
	'/src/assets/logo.png',
	'/src/main.tsx'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			return cachedResponse || fetch(event.request);
		})
	);
});
