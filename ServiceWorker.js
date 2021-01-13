if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./ServiceWorker.js').then(function (reg) {
    if (reg.installing) {
      console.log('Service worker installing');
    }
    if (reg.waiting) {
      console.log('Service worker installed');
    }
    if (reg.active) {
      console.log('Service worker active');
    }
  }).catch(function (error) {
    // registration failed
    console.log('Service worker registration failed with ' + error);
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  // console.log('fetch event:', event)
  event.respondWith(caches.match(event.request).then(function (response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        // console.log('response cloned:', responseClone)
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        console.error("Error: ", response);
        return;
      });
    }
  }));
});