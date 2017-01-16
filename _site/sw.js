const VERSION = '1';

// All the assets that don’t change and our templates.
// We are pretending that our actual page content is
// dynamic and can’t be cached statically.
const ASSETS = [
  '/assets/images/footer/cowboy.png',
  '/assets/images/header/logo-at.png',
  '/assets/images/slider/denver-md.jpg',
  '/assets/images/slider/denver.jpg',
  '/assets/images/slider/kansas-md.jpg',
  '/assets/images/slider/kansas.jpg',
  '/assets/images/slider/norway-md.jpg',
  '/assets/images/slider/norway.jpg',
];

// On install, load all our assets into a 'static' cache
self.oninstall = event => event.waitUntil(async function () {
  const cache = await caches.open('static');
  await cache.addAll(ASSETS);
  return self.skipWaiting();
}());

self.onactivate = event => event.waitUntil(self.clients.claim());

self.onfetch = event => {
  // Parse the request URL so we can separate domain, path and query.
  event.parsedUrl = new URL(event.request.url);

  // If this regexp matches, build a response
  if (event.parsedUrl.pathname.startsWith('/assets/images/')) {
    event.respondWith(caches.match(event.request));
    return;
  }

  return new Response(null, { status: 404 });
};
