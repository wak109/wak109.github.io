// vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

self.addEventListener('fetch', (event) => {
    event.respondWith(
        let fetchRequest = event.request.clone();

	// TODO: fetch from cache
	
        return fetch(fetchRequest)
            .then((response) => {

		// Failure case
                if (!response || response.status !== 200 ||
		    response.type !== 'basic') {
                    return response;
                }

		// Successful case

                let responseToCache = response.clone();

		// TODO: save to cache
                return response;
            });
    );
});
