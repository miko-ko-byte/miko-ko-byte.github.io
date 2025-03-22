self.addEventListener("install", e => {
    caches.delete("bootloader")
    caches.delete("mi-cache")
    const cacheprom = caches.open("bootloader").then(cache => {
        console.log("instalando app, creando bootloader")

        return cache.addAll([
            "/",
            "/mods/Flash Back.png",
            "./css/bootstrap.min.css"
        ])
    })
    e.waitUntil(cacheprom);
})
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Si hay una respuesta en la caché, se devuelve

          if (response) {
           // console.log("disponible en cache, cargando");
            return response;
          }
  
          // Si no hay una respuesta en la caché, se realiza la solicitud a la red
          if (event.request.url.includes("chrome-ex")) {
            console.log("skip> elemento extencion de chrome");
            return fetch(event.request);
          }
          if (event.request.url.includes(".m4a")) {
            console.log("skip> m4a detectado");
            return fetch(event.request);
          }
          if (event.request.url.includes(".mp3")) {
            console.log("skip> mp3 detectado");
            return fetch(event.request);
          }
          if (event.request.url.includes("update.js")) {
            console.log("skip >>>>> actualizacion");
            return fetch(event.request).catch(error =>console.log(">>>modo sin connexion detectado"))
          }
          console.log(event.request.url+" no disponible en cache, descargando y guardando en cache");
          const cacheprom = caches.open("mi-cache").then(cache => {
            return cache.addAll([
                event.request.url
            ])
        })

          return fetch(event.request);
        }
      )
    );
  });
