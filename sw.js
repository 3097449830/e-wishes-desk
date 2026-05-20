// ── BVP Anandam Service Worker ──
// Version: AUTO (network-first, no caching)

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first — कोई cache नहीं
// हर बार fresh content मिलेगा
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});

self.addEventListener('message', e => {
  if(e.data && e.data.action === 'skipWaiting'){
    self.skipWaiting();
  }
});
