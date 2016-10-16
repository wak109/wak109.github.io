// vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:


const CACHE_NAME = 'website-maker-v3';
const urlsToCache = [
    './index.git',
    './readme.md'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
		
                // Add resources listed in urlsToCache
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('activate', (event) => {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete caches not listed in cacheWhiteList 
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
});


self.addEventListener('fetch', (event) => {

    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then((response) => {

                // Hit the cache
                if (response) {
                    console.log("Found " + event.request.url + " in Cache");
                    return response;
                }

                // Clone the request because request is Stream
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            console.log("Failed to fetch" + event.request.url);
                            return response;
                        }

                        // Clone the response because response is Stream
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                console.log("Save " + event.request.url + " to cache");
                                cache.put(event.request, responseToCache);
                            });

                        console.log('Return response');
                        return response;
                    });
            })
    );
});
