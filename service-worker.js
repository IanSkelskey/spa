const cacheName = 'spa-dashboard-cache-v2';
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName).then(cache => cache.addAll(['/', '/index.html']))
	);
});
self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request).catch(() => caches.match(event.request))
	);
});
