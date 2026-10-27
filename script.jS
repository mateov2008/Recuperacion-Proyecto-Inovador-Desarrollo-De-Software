
const productos = [
    { id: 1, nombre: "Laptop HP", categoria: "Computadoras", precio: 599.99, emoji: "💻", descripcion: "Laptop ideal para estudiar y trabajar." },
    { id: 2, nombre: "iPhone", categoria: "Teléfonos", precio: 799.99, emoji: "📱", descripcion: "Teléfono moderno con gran rendimiento." },
    { id: 3, nombre: "Audífonos Bluetooth", categoria: "Accesorios", precio: 39.99, emoji: "🎧", descripcion: "Escucha tu música sin cables." },
    { id: 4, nombre: "PC Gamer", categoria: "Computadoras", precio: 999.99, emoji: "🖥️", descripcion: "Computadora para juegos y tareas exigentes." },
    { id: 5, nombre: "Samsung Galaxy", categoria: "Teléfonos", precio: 499.99, emoji: "📲", descripcion: "Teléfono con pantalla de alta calidad." },
    { id: 6, nombre: "Teclado Mecánico", categoria: "Accesorios", precio: 59.99, emoji: "⌨️", descripcion: "Teclado cómodo para jugar y escribir." },
    { id: 7, nombre: "Tablet", categoria: "Computadoras", precio: 249.99, emoji: "📟", descripcion: "Perfecta para estudiar y entretenerte." },
    { id: 8, nombre: "Mouse Gamer", categoria: "Accesorios", precio: 29.99, emoji: "🖱️", descripcion: "Precisión y comodidad para tus juegos." }
];

let carrito = [];

const catalogo = document.getElementById("catalogo");
const botonesFiltro = document.querySelectorAll("[data-categoria]");
const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const totalCarrito = document.getElementById("totalCarrito");

function mostrarProductos(categoria = "Todos") {
    if (!catalogo) return;

    catalogo.innerHTML = "";

    const filtrados = categoria === "Todos"
        ? productos
        : productos.filter(p => p.categoria === categoria);

    filtrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        tarjeta.innerHTML = `
            <div class="emoji">${producto.emoji}</div>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button type="button" data-agregar="${producto.id}">
                Agregar al carrito
            </button>
        `;

        catalogo.appendChild(tarjeta);
    });
}

function actualizarCarrito() {
    if (!listaCarrito || !cantidadCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = "";

    carrito.forEach((producto, indice) => {
        const elemento = document.createElement("p");
        elemento.append(document.createTextNode(
            `${producto.nombre} - $${producto.precio.toFixed(2)} `
        ));

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            carrito.splice(indice, 1);
            actualizarCarrito();
        });

        elemento.appendChild(botonEliminar);
        listaCarrito.appendChild(elemento);
    });

    cantidadCarrito.textContent = carrito.length;

    const total = carrito.reduce((suma, p) => suma + p.precio, 0);
    totalCarrito.textContent = total.toFixed(2);
}

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        mostrarProductos(boton.dataset.categoria);
    });
});

if (catalogo) {
    catalogo.addEventListener("click", evento => {
        const boton = evento.target.closest("[data-agregar]");
        if (!boton) return;

        const producto = productos.find(
            p => p.id === Number(boton.dataset.agregar)
        );

        if (producto) {
            carrito.push(producto);
            actualizarCarrito();
        }
    });
}

if (abrirCarrito && ventanaCarrito) {
    abrirCarrito.addEventListener("click", () => ventanaCarrito.showModal());
}

if (cerrarCarrito && ventanaCarrito) {
    cerrarCarrito.addEventListener("click", () => ventanaCarrito.close());
}

mostrarProductos();
actualizarCarrito();
