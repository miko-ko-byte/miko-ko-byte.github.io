let fvercion = 10 //fvercion a verificar

if (fvercion == localStorage.getItem("vercion")) {
    console.log("todo en orden");
}else{

    console.log("actualizando f-vercion de sistema");
    document.getElementById("update").style.display="flex";
    document.getElementById("new-vercion").innerText = "vercion disponible v"+fvercion;
    
}

function update() {
    caches.delete("bootloader")
    caches.delete("mi-cache")

}
internet = true
