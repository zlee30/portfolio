const CACHE_NAME = 'calculator-v1';
const FILES = [
  '/portfolio/projects/calculator/',
  '/portfolio/projects/calculator/index.html',
  '/portfolio/projects/calculator/style.css',
  '/portfolio/projects/calculator/script.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});