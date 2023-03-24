let CACHE_VERSION = 0;
let CACHE_NAME = 'cache_v' + CACHE_VERSION;
let CACHE_URLS = [
    '/',
    '/bundle.js',
    '/index.html'
]

function preCache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(CACHE_URLS)
    })
}

function clearCache() {
    return caches.keys().then(keys => {
        if (keys !== CACHE_NAME) {
            caches.delete(keys)
        }
    }
    )
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        preCache()
    )
})

self.addEventListener('activated', function (event) {
    event.waitUntil(
        clearCache()
    )
})

self.addEventListener('fetch', function (event) {
    let url = new URL(event.request.url);
    if (url.origin !== self.origin) {
        return
    }

    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request)
        })
    )
})