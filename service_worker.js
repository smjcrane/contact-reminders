let CACHE_NAME = 'friend-remind';
let urlsToCache = [
  '/contact-reminders/index.html',
  ];

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

self.addEventListener('periodicsync', (event) => {
    state = JSON.parse(localStorage.getItem("state")) || {people: []};
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
