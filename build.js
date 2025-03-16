defaults()
async function saveM4aToLocalStorage(url, key) {

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const base64 = await encodeArrayBufferInBase64(arrayBuffer);
      localStorage.setItem(key,"no data")
      AlmacenarContacto(key,base64)
      internal('Archivo M4A guardado en indexDB con la clave:', key);
    } catch (error) {
      console.error('Error al guardar el archivo M4A en indexDB:', error);
    }
  }
  
 
  function encodeArrayBufferInBase64(arrayBuffer) {
    const chunkSize = 0x8000; // 32KB
    const chunks = [];
  
    for (let i = 0; i < arrayBuffer.byteLength; i += chunkSize) {
      const chunk = arrayBuffer.slice(i, i + chunkSize);
      chunks.push(String.fromCharCode.apply(null, new Uint8Array(chunk)));
    }
  
    return btoa(chunks.join(''));
  }
  

if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      // Obtenemos información sobre la batería
      var level = battery.level * 100; // Nivel de batería en porcentaje
      var charging = battery.charging; // Booleano: indica si el dispositivo está conectado a la corriente o no
  
      // Mostramos información en la consola
      internal("Nivel de batería: " + level + "%");
      internal("Cargando: " + (charging ? "Sí" : "No"));
  
      // Haces lo que necesites con esta información
      if (charging) {
        // El dispositivo está conectado a la corriente
      } else {
        // El dispositivo no está conectado a la corriente (usando batería)
      }
    });
  } else {
    internal("La API de Battery Status no está disponible en este navegador.");
  }



var audioPlayer = document.getElementById('rep');
var volumeSlider
var seekSlider = document.getElementById('timerP');
var pb
var pbs
pb = document.getElementById('playbuttonimgP');
pbs = document.getElementById('playbuttonP');
volumeSlider = document.getElementById('volumenP');

function playBase64Audio(base64) {
    const blob = base64ToBlob(base64, 'audio/mpeg');
    const blobUrl = URL.createObjectURL(blob);
    audioPlayer.src = blobUrl;
    audioPlayer.src = blobUrl;
    audioPlayer.play();
}
function base64ToBlob(base64, mimeType) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
}
// Función para reproducir o pausar el audio
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        internal("playing!");
        pb.src = "./mods/play.png"

    } else {
        audioPlayer.pause();

        pb.src = "./mods/pause.png"
        internal('paused!');
    }
}
function set(link, id, title) {
    favorite(link);
    if (localStorage.getItem(link) != null) {
        changeWebsiteIcon(document.getElementById(id).src);
        document.getElementById("title_bar").innerText = title
        audioPlayer.poster = document.getElementById(id).src;
        reproducirAudio(link)
    } else {
        audioPlayer.src = link;
        internal("try to load from internet: " + id);
        changeWebsiteIcon(document.getElementById(id).src);
        document.getElementById("title_bar").innerText = title
        audioPlayer.poster = document.getElementById(id).src;
        audioPlayer.play();
    }

}

audioPlayer.addEventListener('timeupdate', () => {
    seekSlider.max = audioPlayer.duration;
   seekSlider.value = audioPlayer.currentTime;
    internal("time now: " + audioPlayer.currentTime);
});

// Actualizar la posición de reproducción cuando cambia el valor del slider
function updateSeek() {
    internal(Number(seekSlider.value));
    internal(audioPlayer.currentTime);
    audioPlayer.currentTime = Number(seekSlider.value) 
    internal("Time update to: " + audioPlayer.currentTime);
}



function reproducirAudio(link) {
    internal('Trying to load from data base')
    const request = window.indexedDB.open('audioDatabase', 1);
  
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['audios'], 'readonly');
      const objectStore = transaction.objectStore('audios');
  
      // Buscar el audio en la base de datos
      const getRequest = objectStore.get(link);
      getRequest.onsuccess = function(event) {
        if (event.target.result) {
          const audioData = event.target.result;
          const audioFile = audioData.file;
          const audioUrl = URL.createObjectURL(audioFile);
  
          // Crear un nuevo elemento <audio> y reproducir el archivo
          const audioElement = document.getElementById("rep");
          audioElement.src = audioUrl;

          audioElement.play();
        } else {
          internal('El audio no existe en la base de datos');
        }
      };
    };
  
    request.onerror = function(event) {
      console.error('Error al abrir la base de datos:', event.target.errorCode);
    };
  }
function favorite(link) {
    link = link.replace("./",localStorage.getItem("serverurl"))
    //iniciar base de favoritos
    let icon = document.getElementById("favorite_icon").src
    if (localStorage.getItem("favorite") == null) {

        localStorage.setItem("favorite", `{"fav":["./songs/i kiss.m4a"]}`)
    }
    let base = JSON.parse(localStorage.getItem("favorite"))
    internal(base.fav)
    internal(link);
    internal(base.fav.includes(link))
    if (base.fav.includes(link)) {
        internal("the song is into favorite");
        document.getElementById("favorite_icon").src = "./mods/favorite_full.png"
    } else {
        internal("the song is not into favorite");
        document.getElementById("favorite_icon").src = "./mods/favorite.png"
    }
    document.getElementById("favorite").setAttribute("onClick", "javascript:favorite_set('" + link + "');");
}

function favorite_set(link) {
    //iniciar base de favoritos
    let icon = document.getElementById("favorite_icon").src
    let base = JSON.parse(localStorage.getItem("favorite"))
    if (!base.fav.includes(link)) {
        base.fav.push(link)
        internal(link + "is now in favorite");
        localStorage.setItem("favorite", JSON.stringify(base))
        document.getElementById("favorite_icon").src = "./mods/favorite_full.png"
    } else {
        const indiceElemento = base.fav.indexOf(link);
        if (indiceElemento !== -1) {
            base.fav.splice(indiceElemento, 1);
        }
        localStorage.setItem
        ("favorite", JSON.stringify(base))
        internal(link + "is nown`t in favorite");
        document.getElementById("favorite_icon").src = "./mods/favorite.png"
    }
}


let compass = "none"
//se usa cuando quieres llamar a fenderizar con algun atributo
function filter(requisito) {
    internal("filter mode: " + requisito);
    if(requisito=="total"){
        compass = "none"
    }
    compass = requisito
    reload(localStorage.getItem("server"),).then(objetoJSON=>{
        renderizar(objetoJSON)
      })
}
//se usa cada ciclo que renderizar esta en funcion(si son 3 canciones, 3 siclos) y se usa para filtrar
function indicator(comparador) {
    if (compass == "none") {
        internal("is using none")
        return true
    }
    if ("fav" == compass) {
        let base = JSON.parse(localStorage.getItem("favorite"))
        internal("is using fav")
        comparador = comparador.replace("./",localStorage.getItem("serverurl"))
        if (base.fav.includes(comparador)) {
            return true
        } else {
            return false
        }
    }
    if ("dwn" == compass) {
        internal("is using dwn")
        comparador = comparador.replace("./",localStorage.getItem("serverurl"))
        if (localStorage.getItem(comparador) == null) {
            return false
        } else {
            return true
        }
    }
    if ("playlist1" == compass) {
        return true
    }
}function cerrar() {
    document.getElementById("ventana-flotante").style.display = "none";
}

// Mostrar la ventana flotante cuando se cargue la página
function openset() {
    const miDiv = document.getElementById('navphone');

    // Crear un nuevo elemento <p>
    const nuevoParagrafo = document.createElement('div');
    nuevoParagrafo.innerHTML = `
    <h1>ajustes</h1>
    <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="sentnoti">
  <label class="form-check-label" for="flexSwitchCheckDefault">enviar notificaciones</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="lowmode">
  <label class="form-check-label" for="flexSwitchCheckDefault">enviar notificaciones</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="sentnoti">
  <label class="form-check-label" for="flexSwitchCheckDefault">enviar notificaciones</label>
</div>
`;

    // Agregar el nuevo párrafo al div
    miDiv.appendChild(nuevoParagrafo);
};async function donwload() {
  await fetch('./cachefiles.json')
    .then(response => response.json())
    .then(data => {
      // Aquí puedes trabajar con los datos JSON cargados
      return data
      // Realiza cualquier operación adicional con los datos
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });
}
function guardarEnCache(url) {
  // Verifica si el navegador es compatible con Service Workers
  if ('caches' in window) {
    // Abre el caché con el nombre 'mi-cache'
    caches.open('data')
      .then(cache => {
        caches.match(url).then(b => {
          if (b !== undefined) {
            internal("ya esta en cache");
            return
          }
          // Realiza una solicitud fetch a la URL
          fetch(url)
            .then(response => {
              // Clona la respuesta para poder almacenarla en el caché
              const cacheResponse = response.clone();
              // Agrega la respuesta al caché
              cache.put(url, cacheResponse);
              internal(`${url} guardado en el caché`);
            })
            .catch(error => {
              console.error('Error al guardar en el caché:', error);
            });
        })
      })

      .catch(error => {
        console.error('Error al abrir el caché:', error);
      });
  } else {
    console.error('El navegador no es compatible con Service Workers');
  }
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function(registration) {
      internal('Service Worker registrado exitosamente:', registration);
    })
    .catch(function(error) {
      internal('Error al registrar el Service Worker:', error);
    });
}

var bd;
function IniciarBaseDatos(){
var solicitud = indexedDB.open("Datos-De-Contacto");
solicitud.addEventListener("error", MostrarError);
solicitud.addEventListener("success", Comenzar);
solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}
function MostrarError (evento)
{
alert("Tenemos un ERROR:" + evento.code + + evento.message);
}
function Comenzar (evento)
{
bd = evento.target.result;
}
function CrearAlmacen (evento){
var basedatos = evento.target.result;
var almacen = basedatos.createObjectStore("Contactos", {keyPath: "id"});
}

function AlmacenarContacto(key,base64)
{
var transaccion = bd.transaction (["Contactos"], "readwrite");
var almacen = transaccion.objectStore("Contactos");
almacen.add({
data: base64,
id: key
});
}

function Mostrar(){
  cajaContactos.innerHTML = "";
  var transaccion = bd.transaction (["Contactos"]);
  var almacen = transaccion.objectStore("Contactos");
  var puntero = almacen.openCursor();
  puntero.addEventListener("success", MostrarContactos);
  }
window.addEventListener("load", IniciarBaseDatos);

function MostrarContactos(evento) {
        audioPlayer.src = evento.target.result.value.data;
        internal(evento.target.result.value);
        audioPlayer.play();
}function reload(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al descargar el archivo JSON. Código de estado: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonData => {
        resolve(jsonData);
        populateServerOptions(url)
      })
      .catch(error => {
        reject(error);
      });
  });
}
function press(link,id,title) {
  if (internet == false) {
    document.getElementById("internetstatus").style.display="flex"
  }
  link = link.replace("./",localStorage.getItem("serverurl"))
  internal("link> "+link)
  if (localStorage.getItem(link) == null) {
    return `<button type="button" class="btn" style="background-color:greenyellow" onclick="set('${link.replace("./",localStorage.getItem("serverurl"))}','${id}')">reproducir</button>
            <button type="button" class="btn" style="border-color:white; color:white" onclick="download('${link.replace("./",localStorage.getItem("serverurl"))}')">descargar</button>`
  } else {
    
    return `
    <span class="badge" style="border-color:white; color:white">Disponible sin conexion</span>
    <button type="button" class="btn" style="background-color:greenyellow" onclick="set('${link.replace("./",localStorage.getItem("serverurl"))}','${id}','${title}')">reproducir</button>
    `
  }

}
function reset() {
  localStorage.clear("lowmode")
}
// Uso de la función
reload(localStorage.getItem("server"),).then(objetoJSON=>{
  renderizar(objetoJSON)
}

)
  
function changeWebsiteIcon(iconUrl) {
  guardarEnCache(iconUrl)
  const existingLink = document.querySelector("link[rel*='icon']");
  const newLink = document.createElement('link');
  newLink.type = 'image/png'; // Cambiar el tipo a 'image/png'
  newLink.rel = 'shortcut icon';
  newLink.sizes = "256x256"
  newLink.href = iconUrl+"?type=squa";

  if (existingLink) {
    document.head.removeChild(existingLink);
  }
  document.head.appendChild(newLink);
}

// Llamar a la función con la URL del nuevo ícono PNG

function reloads() {
  localStorage.setItem("serverurl", document.getElementById("server").value)

  let champoo = String(document.getElementById("server").value)
  if (champoo.includes("/index.json")) {
    localStorage.setItem("server", document.getElementById("server").value)
  } else {
    localStorage.setItem("server", document.getElementById("server").value + "/index.json")

  }
  if (champoo.includes("/index.json")) {
    localStorage.setItem("serverurl", champoo.replace("/index.json", "/"))

  } else {
    localStorage.setItem("serverurl", document.getElementById("server").value)

  }
  let cacheurl = localStorage.getItem("server")
  reload(localStorage.getItem("server")).then(objetoJSON => {
    renderizar(objetoJSON)
  })
}
let exept = []

function renderizar(objetoJSON, esbuscar, clave) {
  document.getElementById("internetstatus").style.display="none"
  exept = []
  localStorage.setItem("small","true")
  if (localStorage.getItem("lowmode") == null) {
    localStorage.setItem("lowmode", "phone")
  }
  let number
  internal(objetoJSON["index"].number);
  // Crear un nuevo div
  internal(objetoJSON.index.number)
  var numeroDeRepeticiones = objetoJSON.index.number;
  let masterDiv = document.getElementById("masterdiv")
  if (masterDiv) {
    // Si existe, eliminar el div existente, y lo crea vacio
    masterDiv.parentNode.removeChild(masterDiv);
    masterDiv = document.createElement("div");
    masterDiv.id = "masterdiv";
    document.body.appendChild(masterDiv);

  }else{
    //Si no, solo lo crea
    masterDiv = document.createElement("div");
    masterDiv.id = "masterdiv";
    document.body.appendChild(masterDiv);
  }
  
  // Bucle para crear y agregar divs al DOM
  for (var i = 0; i < numeroDeRepeticiones; i++) {
    // Crear un nuevo div
   number = Number(i) + 1
  
   var nuevoDiv = document.createElement("div");
    
    // Establecer las clases del nuevo div
    nuevoDiv.className = "row row-cols-1 row-cols-md-3 g-4";
    nuevoDiv.id = "card-m"+number
    if (indicator(objetoJSON['n' + number].patch) !== false) {
      internal("coninciden");
 if (localStorage.getItem("lowmode") == "phone") {
        document.getElementById("nav").style.display = "none"
    document.getElementById("navphone").style.display = "block"
    document.getElementById("navbar").style.display = "block"
  
        nuevoDiv.innerHTML = `<div style="background-color:white !important; padding:0"  class="card text-bg-dark">
                  <img src="..." class="card-img" id="card-${number}img" alt="...">
                  <div class="card-img-overlay">
                    <h5 class="card-title" id="card-${number}n">Card title</h5>
                    <p class="card-text" id="card-${number}d">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text" ><small id="card-${number}u">Last updated 3 mins ago</small></p>${press(objetoJSON['n' + number].patch.replace(".", "."), "card-" + number + "img",objetoJSON["n" + number].name)}
                    <p class="card-text">
                  </div>
                </div>`;
                
      }
        
      // Agregar el nuevo div al cuerpo del documento
      masterDiv.appendChild(nuevoDiv);
      // Número de repeticiones deseadas
    }else{
      exept.push("n" + number)
    }
   

  }
  aft(numeroDeRepeticiones,objetoJSON)


}

function aft(numeroDeRepeticiones,objetoJSON) {
    // Bucle para crear y agregar divs al DOM
    for (var i = 0; i < numeroDeRepeticiones; i++) {
      number = Number(i) + 1
      if (!exept.includes("n" + number)) {
      internal("creando numero "+number);
      document.getElementById("card-" + number + "n").innerText = objetoJSON["n" + number].name
      document.getElementById("card-" + number + "d").innerText = objetoJSON["n" + number].desc
      document.getElementById("card-" + number + "u").innerText = objetoJSON["n" + number].upload
      if (number == numeroDeRepeticiones) {
        document.getElementById("card-m" + number).style = "padding-bottom:190px"
      }
      if (objetoJSON.index.style == "full") {
        guardarEnCache(objetoJSON["n" + number].img)
        internal("img link> "+objetoJSON["n" + number].img.replace("./",localStorage.getItem("serverurl")) );
        document.getElementById("card-" + number + "img").src = objetoJSON["n" + number].img.replace("./",localStorage.getItem("serverurl")) 
      }
  
    }
    Number(i)
  }
}

let vercion = "10" //vercion del sistema

localStorage.setItem("vercion",vercion)
document.getElementById("v").innerText = "vercion>"+vercion+""
document.getElementById("server").value = localStorage.getItem("server")
function download(link) {
  const request = window.indexedDB.open('audioDatabase', 1);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('audios', { keyPath: 'link' });
  };

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['audios'], 'readonly');
    const objectStore = transaction.objectStore('audios');

    const getRequest = objectStore.get(link);
    getRequest.onsuccess = function(event) {
      if (!event.target.result) {
        fetch(link)
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const audioBlob = new Blob([buffer], { type: 'audio/mp4' });
            const audioFile = new File([audioBlob], 'audio.m4a', { type: 'audio/mp4' });
            const audioData = { link: link, file: audioFile };

            const writeTx = db.transaction(['audios'], 'readwrite');
            const writeStore = writeTx.objectStore('audios');
            writeStore.add(audioData);

            writeTx.oncomplete = function() {
              localStorage.setItem(link, 'no data');
              reload(localStorage.getItem("server"),).then(objetoJSON=>{
                renderizar(objetoJSON)
              })
              internal('Audio descargado y guardado en la base de datos');
            };

            writeTx.onerror = function(error) {
              console.error('Error al guardar el audio:', error);
            };
          })
          .catch(error => console.error('Error al descargar el audio:', error));
      } else {
        internal('El audio ya existe en la base de datos');
      }
    };
  };

  request.onerror = function(event) {
    console.error('Error al abrir la base de datos:', event.target.errorCode);
  };
}var chamoy
window.onload = function () {
    document.getElementById("logo").style.opacity = 1
    setTimeout(() => {
        chamoy = setInterval(() => {
            document.getElementById("logo").style.opacity = document.getElementById("logo").style.opacity - 0.1
        }, 10);

    }, 1000);
    setTimeout(() => {
        window.clearInterval(chamoy)
        var capa = document.getElementById("logo");
        capa.style.display = "none";
        capa.style.visibility = "hidden";
    }, 1500);
}



function defaults() {
  

if (localStorage.getItem("server") == null) {
    localStorage.setItem("server","https://flashbackserver.github.io/index.json")
}
if (localStorage.getItem("serverurl") == null) {
  localStorage.setItem("serverurl","https://flashbackserver.github.io/")
}
if (localStorage.getItem("favorite") == null) {
    localStorage.setItem("favorite",`{"fav":["weonao"]}`)
  }
  if (localStorage.getItem("serverlist") == null) {
    localStorage.setItem("serverlist",`{"server":["https://flashbackserver.github.io/index.json"]}`)
  }

}
function internal(params) {
  //lol XDDDDD
}function populateServerOptions(url) {
    
    const serversElement = document.getElementById("servers");
    const serverListJson = localStorage.getItem("serverlist");
    internal("actualizando lista>> "+url);
    if (serverListJson.includes(String(url)) == false) {
        if (url == undefined) {
            return
        }
        let templist = JSON.parse(serverListJson)
        templist.server.push(String(url))
        localStorage.setItem("serverlist",JSON.stringify(templist))
        internal("nuevo server detectado");
    }
    const serverList = JSON.parse(serverListJson);

    while (serversElement.firstChild) {
        serversElement.removeChild(serversElement.firstChild);
      }

    if (serverList && serverList.server && Array.isArray(serverList.server)) {
      // Iteramos sobre cada URL en serverList.server
      serverList.server.forEach((url, index) => {
        internal("url> "+url+" index> "+index);
        // Creamos un elemento <option>
        const option = document.createElement("option");
        // Asignamos el valor del elemento <option>
        option.value = url;
        // Asignamos el texto del elemento <option>
        option.text = `${index + 1}: ${url}`;
         // Asumiendo que los índices comienzan en 1
        if (url == document.getElementById("server").value) {
            option.selected  = true
        } 
        
  
        // Agregamos el elemento <option> al elemento "servers"
        serversElement.appendChild(option);
      });
    } else {
      console.error("El valor del localStorage 'serverlist' no es válido.");
    }
  }
  
  // Llamamos a la función para poblar las opciones del elemento "servers"
  populateServerOptions();


  function update_server() {
    document.getElementById("server").value = document.getElementById("servers").value
    reloads()
  }
