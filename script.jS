
const boton = document.getElementById("botonSaludo");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {
    mensaje.textContent = "¡Felicidades! Tu sitio web funciona correctamente.";
});
