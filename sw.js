// ── BVP Anandam Service Worker ──
const CACHE_VERSION = 'bvp-v1';

self.addEventListener('install', e => {
  // तुरंत activate हो जाओ
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // पुराने caches हटाओ
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first — हमेशा नया version मिले
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', e => {
  if(e.data && e.data.action === 'skipWaiting'){
    self.skipWaiting();
  }
});
