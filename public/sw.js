self.addEventListener('install', function (event) {
    console.log('Service Worker installing.')
})

self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.')
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        return (
                            cacheName.startsWith('my-app') &&
                            !cacheName.endsWith('v1')
                        )
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName)
                    })
            )
        })
    )
})

self.addEventListener('fetch', function (event) {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    return response
                }
                return fetch(event.request).then(function (response) {
                    if (!response || response.status !== 200) {
                        return response
                    }
                    var responseToCache = response.clone()
                    caches.open('images-cache').then(function (cache) {
                        cache.put(event.request, responseToCache)
                    })
                    return response
                })
            })
        )
    }
})

self.addEventListener('push', function (event) {
    var data = event.data.json()

    var options = {
        body: data.body,
        icon: data.icon || '/icons/favicon-512x512.png',
        badge: data.badge || '/icons/favicon-32x32.png',
        vibrate: data.vibrate || [200, 100, 200],
        data: data.data || {},
        actions: data.actions || [],
        silent: false
    }

    if (data.sound) {
        options.sound = data.sound
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    event.waitUntil(clients.openWindow(event.notification.data.url || '/app'))
})

var handler = function (args) {
    return caches.match('/offline')
}

self.addEventListener('fetch', function (event) {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(function () {
                return handler(event)
            })
        )
    }
})
