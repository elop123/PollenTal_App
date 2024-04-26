const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v2";

const cacheAssets = [
	'/index.html',
	'/map.html',
	'/settings.html',
	'/aassets/images',
	'/aassets/css',
	'/aassets/js/app.js',
	'/aassets/js/script.js',
	'/aassets/js/script2.js',
	'/aassets/js/script3.js'
]

/**
 * Function to limit the size of cache with
 * @param {String} cacheName Name for cache
 * @param {Number} numAllowedFiles Number of files allowed
 */
const limitCacheSize = (cacheName, numAllowedFiles) => {
	// Open the cache
	caches.open(cacheName).then((cache) => {
	  // Get the array keys
	  cache.keys().then((keys) => {
		// If the amount of files exceeds the allowed
		if (keys.length > numAllowedFiles) {
		  //Delete first index (oldest file) and run function again until number is reached
		  cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles))
		}
	  })
	})
  }

// Install Service Worker
self.addEventListener('install', event => {
//console.log('Service Worker has been installed');
event.waitUntil(
    // Open static cache
    caches.open(staticCacheName).then((cache) => {
      // Add array of assests here
      cache.addAll(cacheAssets)
    })
  )
})


// Activate Service Worker
self.addEventListener('activate', event => {
//console.log('Service Worker has been activated');

 //Wait until all tasks are completed
 event.waitUntil(
    // Call all cache keys (Name of cache collections)
    caches.keys().then((keys) => {
      // Returns an array of promises (one promise for each file)
      return Promise.all(
        keys
          // Filter everyone who is not a member of the current cache version
          .filter((key) => key !== staticCacheName)
          // Map filter array and delete files
          .map((key) => caches.delete(key))
      )
    })
  )
  return
})

// Fetch event
self.addEventListener('fetch', (event) => {
//console.log('Fetch event', event)

limitCacheSize(dynamicCacheName, 2)

if(event.request.url.indexOf("firestore.googleapis.com") === -1) {
  // Fix the  problem with dynamic cache and chrome extension bug
  if (!(event.request.url.indexOf("http") === 0)) return

  // Check response to request
  event.respondWith(
	/* Handling cache match and dynamic cache  */

	// Check for file match in cache
	caches.match(event.request).then((cacheRes) => {
	  // Return if match from cache - otherwise get file on server
	  return (
		cacheRes || fetch(event.request).then((async (fetchRes) => {
		  // Open dynamic cache
		  return caches.open(dynamicCacheName).then((cache) => {
			// Add page to dynamic cache
			cache.put(event.request.url, fetchRes.clone())

			// Calls the limit function
			limitCacheSize(dynamicCacheName, 2)

			// Return the request
			return fetchRes
		  })
		})
	  )
	)})
  )
}
})
