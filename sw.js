/* Barograf service worker — skallet fra cache, værdata fra nett med cache som reserve */
const SHELL = 'barograf-shell-v1';
const API   = 'barograf-api-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== API).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // eget innhold: cache først, så nett
  if(url.origin === location.origin){
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(e.request, copy));
        return res;
      }))
    );
    return;
  }

  // værdata: nett først, fall tilbake på siste hentede svar når nettet er borte
  if(/api\.met\.no$|open-meteo\.com$/.test(url.hostname)){
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(API).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request))
    );
  }
});
