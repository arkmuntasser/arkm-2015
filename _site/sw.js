const VERSION = "3.1.3";

const cacheName = 'arkmuntasser';
const APP_CACHE_NAME = 'arkmuntasser-app';
const STATIC_CACHE_NAME = 'arkmuntasser-static';

console.log(`installing sw.js`);

const CACHE_STATIC = [
  '/assets/images/footer/cowboy.png',
  '/assets/images/header/logo-at.png',
  '/assets/images/slider/denver-md.jpg',
  '/assets/images/slider/denver.jpg',
  '/assets/images/slider/kansas-md.jpg',
  '/assets/images/slider/kansas.jpg',
  '/assets/images/slider/norway-md.jpg',
  '/assets/images/slider/norway.jpg',
  '/fontello.css',
  '/widgets/twitter-banner/twitter-banner-noscript.css',
  '/widgets/twitter-banner/twitter-banner.css',
  '/android-chrome-192x192.png',
  '/android-chrome-384x384.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/mstile-150x150.png',
  '/safari-pinned-tab.svg'
 ];

 const CACHE_APP = [
  '/',
  '/index.html'
 ];

self.addEventListener('install',function(e){
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME),
      caches.open(APP_CACHE_NAME),
      self.skipWaiting()
    ]).then(function(storage){
      var static_cache = storage[0];
      var app_cache = storage[1];
      return Promise.all([
        static_cache.addAll(CACHE_STATIC),
        app_cache.addAll(CACHE_APP)]);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== APP_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('deleting',cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

this.addEventListener('fetch', function(event) {
  if (event.request.url.includes('spreadsheets')) {
    event.respondWith(async function() {
      try {
        let resp;
        const fetchedVersion = resp = fetch(event.request);
        const fetchedCopy = fetchedVersion.then(function(response) {
          const r = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(event.request, r);
          });
        }, function() {
          resp = caches.match(event.request) || new Response(null, { status : 404 });
        });

        return await resp;
      } catch(_) {
        const caughtResponse = caches.match(event.request) || new Response(null, { status : 404 });
        return caughtResponse;
      }
    }());
  } else {
    var response;
    event.respondWith(caches.match(event.request)
      .then(function (match) {
        return match || fetch(event.request);
      }).catch(function() {
        return fetch(event.request);
      })
      .then(function(r) {
        response = r;
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      })
    );
  }
});
