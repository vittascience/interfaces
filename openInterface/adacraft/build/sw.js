// These will be replaced at build-time by generate-service-worker-plugin.js
const ASSETS = ["js/vendors~addon-settings~credits~editor~embed~fullscreen~player.ed441918bf14b8769e1b.js","js/addon-settings~editor~fullscreen~player.b42a29042cd378533d56.js","js/editor~embed~fullscreen~player.bbc48eade8eb1ba3e510.js","js/vendors~editor~embed~fullscreen~player.d0a1e6aad655d25753d9.js","js/addon-settings~addons.550767ace31722ead9b0.js","js/addon-settings.e53e316504b465854159.js","js/addons.8bfe2ef1d9510b6e875f.js","js/editor.6f2eb386cda20adba91d.js","js/fullscreen.53ea6c944a0ee2e3932c.js","js/player.cd59b1ecb84334766a9e.js","index.html","player.html","fullscreen.html","addons.html"];
const CACHE_NAME = 'tw-7d59d96d308ba05a165666c0d1c3a26eac1b591a';

const base = location.pathname.substr(0, location.pathname.indexOf('sw.js'));

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(i => i !== CACHE_NAME).map(i => caches.delete(i))))
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return;
    if (event.request.method !== 'GET') return;

    let rewrite;
    const pathname = url.pathname.substr(base.length);
    if (/^(\d+\/?)?$/.test(pathname)) {
        rewrite = 'index.html';
    } else if (/^(\d+\/)?editor\/?$/i.test(pathname)) {
        rewrite = 'editor.html';
    } else if (/^(\d+\/)?fullscreen\/?$/i.test(pathname)) {
        rewrite = 'fullscreen.html';
    } else if (/^addons\/?$/i.test(pathname)) {
        rewrite = 'addons.html';
    }
    if (rewrite) {
        event.respondWith(fetch(event.request).catch(() => caches.match(new Request(rewrite))));
    }
});
