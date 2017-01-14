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

// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
// So when this regexp matches, we know we have to _build_ a response.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;
self.onfetch = event => {
  // Parse the request URL so we can separate domain, path and query.
  event.parsedUrl = new URL(event.request.url);

  // If this regexp matches, build a response
  if (event.parsedUrl.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(event.request));
    return;
  }
  // Otherwise, use our dynamic caching strategy
  staleWhileRevalidate(event);
};

// This function builds a temporary pseudo-event object so we can
// grab the response as the value of the returned promise.
function staleWhileRevalidateWrapper(request, waitUntil) {
  return new Promise(resolve => {
    staleWhileRevalidate({
      request,
      respondWith: resolve,
      waitUntil
    })
  });
}

// staleWhileRevalidate is a caching strategy. It responds with
// whatever it got cached (if anything), while updating the cache
// in the background.
function staleWhileRevalidate(event) {
  const fetchedVersion = fetch(event.request);
  // Since we _might_ be responding with the fetched response
  // and also using it to populate the cache, we need to make a copy.
  const fetchedCopy = fetchedVersion.then(response => response.clone());
  const cachedVersion = caches.match(event.request);

  event.respondWith(async function () {
    try {
      // Respond with whatever is ready first, fetched or cached version.
      // Since fetch() will reject when offline, resolve to cachedVersion
      // on reject so we always resolve to something.
      const response = await Promise.race([
        fetchedVersion.catch(_ => cachedVersion),
        cachedVersion
      ]);
      // However, caches.match() will resolve to `undefined` if there’s
      // nothing in cache. If that’s the case, wait for the network response.
      if (!response) {
        return await fetchedVersion;
      }
      return response;
    } catch(_) {
      // If nothing returns a valid response (rejects or is undefined),
      // we just return 404.
      return new Response(null, {status: 404});
    }
  }());

  // event.waitUntil(async function () {
  //   try {
  //     const response = await fetchedCopy;
  //     const cache = await caches.open('dynamic');
  //     return cache.put(event.request, response);
  //   } catch(_) {/* eat errors */}
  // }());
}
