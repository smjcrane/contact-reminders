let CACHE_NAME = 'friend-remind';
let urlsToCache = [
  '/contact-reminders/index.html',
  '/contact-reminders/localforage.min.js',
  ];

self.importScripts('/contact-reminders/localforage.min.js');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('periodicsync', async (event) => {
    state = JSON.parse(await localforage.getItem("state")) || {people: []};
    console.log(state)
    needToMessage = state.people.filter(person => {
        if (!person.lastMessaged) {
            return true
        }
        date = moment(person.lastMessaged)
        days = moment().diff( date, 'days');
        return days >= person.frequency;
    })
    notification = new Notification("Message some people");
})
