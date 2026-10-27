
const productos = [
    {
        id: 1,
        nombre: "iPhone 15",
        categoria: "Celulares",
        precio: 699.99,
        descripcion: "Smartphone con gran rendimiento y cámara avanzada.",
        imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        nombre: "Samsung Galaxy",
        categoria: "Celulares",
        precio: 549.99,
        descripcion: "Diseño elegante, pantalla brillante y gran potencia.",
        imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        nombre: "Laptop Lenovo",
        categoria: "Computadoras",
        precio: 799.99,
        descripcion: "Ideal para estudiar, trabajar y realizar proyectos.",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        nombre: "MacBook",
        categoria: "Computadoras",
        precio: 1299.99,
        descripcion: "Portátil moderna para productividad y creatividad.",
        imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        nombre: "Auriculares inalámbricos",
        categoria: "Accesorios",
        precio: 59.99,
        descripcion: "Escucha tu música favorita con comodidad.",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        nombre: "Reloj inteligente",
        categoria: "Accesorios",
        precio: 89.99,
        descripcion: "Consulta notificaciones y registra tu actividad.",
        imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        nombre: "Teclado mecánico",
        categoria: "Accesorios",
        precio: 74.99,
        descripcion: "Precisión y comodidad para trabajar o jugar.",
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        nombre: "Monitor HD",
        categoria: "Computadoras",
        precio: 219.99,
        descripcion: "Amplía tu espacio de trabajo con una imagen nítida.",
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80"
    }
];

let carrito = [];

const catalogo = document.getElementById("catalogo");
const contadorCarrito = document.getElementById("contador-carrito");
const modalCarrito = document.getElementById("modal-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

const formatoPrecio = precio =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(precio);

// Mostrar productos en la página
function mostrarProductos(categoria = "Todos") {
    const productosFiltrados = categoria === "Todos"
        ? productos
        : productos.filter(producto => producto.categoria === categoria);

    catalogo.replaceChildren();

    productosFiltrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const imagenContenedor = document.createElement("div");
        imagenContenedor.className = "producto-imagen";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.loading = "lazy";

        imagenContenedor.appendChild(imagen);

        const informacion = document.createElement("div");
        informacion.className = "producto-info";

        const categoriaTexto = document.createElement("p");
        categoriaTexto.className = "producto-categoria";
        categoriaTexto.textContent = producto.categoria;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "producto-descripcion";
        descripcion.textContent = producto.descripcion;

        const pie = document.createElement("div");
        pie.className = "producto-pie";

        const precio = document.createElement("span");
        precio.className = "producto-precio";
        precio.textContent = formatoPrecio(producto.precio);

        const boton = document.createElement("button");
        boton.className = "boton-agregar";
        boton.textContent = "Agregar +";
        boton.addEventListener("click", () => agregarAlCarrito(producto.id));

        pie.append(precio, boton);
        informacion.append(categoriaTexto, nombre, descripcion, pie);
        tarjeta.append(imagenContenedor, informacion);
        catalogo.appendChild(tarjeta);
    });
}

// Filtrar productos por categoría
document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach(filtro => {
            filtro.classList.remove("activo");
        });

        boton.classList.add("activo");
        mostrarProductos(boton.dataset.categoria);
    });
});

// Agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Cambiar la cantidad de un producto
function cambiarCantidad(id, cambio) {
    const item = carrito.find(producto => producto.id === id);

    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(producto => producto.id !== id);
    }

    actualizarCarrito();
}

// Mostrar contenido y total del carrito
function actualizarCarrito() {
    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad, 0
    );

    contadorCarrito.textContent = cantidadTotal;
    listaCarrito.replaceChildren();

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "mensaje-vacio";
        mensaje.textContent = "Tu carrito está vacío.";
        listaCarrito.appendChild(mensaje);
    }

    carrito.forEach(producto => {
        const fila = document.createElement("div");
        fila.className = "item-carrito";

        const informacion = document.createElement("div");
        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = formatoPrecio(producto.precio * producto.cantidad);

        informacion.append(nombre, precio);

        const controles = document.createElement("div");
        controles.className = "cantidad-carrito";

        const restar = document.createElement("button");
        restar.textContent = "−";
        restar.setAttribute("aria-label", "Quitar una unidad de " + producto.nombre);
        restar.addEventListener("click", () => cambiarCantidad(producto.id, -1));

        const cantidad = document.createElement("span");
        cantidad.textContent = producto.cantidad;

        const sumar = document.createElement("button");
        sumar.textContent = "+";
        sumar.setAttribute("aria-label", "Agregar una unidad de " + producto.nombre);
        sumar.addEventListener("click", () => cambiarCantidad(producto.id, 1));

        controles.append(restar, cantidad, sumar);
        fila.append(informacion, controles);
        listaCarrito.appendChild(fila);
    });

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad, 0
    );

    totalCarrito.textContent = formatoPrecio(total);
}

// Abrir y cerrar el carrito
document.getElementById("ver-carrito").addEventListener("click", () => {
    modalCarrito.showModal();
});

document.getElementById("cerrar-carrito").addEventListener("click", () => {
    modalCarrito.close();
});

// Vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Iniciar la página
mostrarProductos();
actualizarCarrito();
