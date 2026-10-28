
const productos = [
    {
        id: 1,
        nombre: "Pupusa de queso",
        descripcion: "Deliciosa pupusa rellena de queso derretido.",
        precio: 0.75,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Pupusas_con_curtido_y_salsa_El_Salvador.JPG"
    },
    {
        id: 2,
        nombre: "Pupusa de frijol",
        descripcion: "Pupusa tradicional rellena de frijoles.",
        precio: 0.60,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Pupusas_with_curtido_and_salsa.jpg"
    },
    {
        id: 3,
        nombre: "Pupusa revuelta",
        descripcion: "Mezcla de queso, frijoles y chicharrón.",
        precio: 0.75,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://www.infobae.com/resizer/v2/CWEKWACRCJATJCMU5K7DAQZCAU.png?auth=6835a1a00033f9b8fb3ae9ea8fffd3aea95f36baf161086da3c732ea434b4f2b&height=1200&quality=85&smart=true&width=1200"
    },
    {
        id: 4,
        nombre: "Pupusa de chicharrón",
        descripcion: "Pupusa con delicioso chicharrón molido.",
        precio: 0.75,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Pupusas_con_curtido_y_salsa_El_Salvador.JPG"
    },
    {
        id: 5,
        nombre: "Pupusa de loroco",
        descripcion: "Queso derretido combinado con loroco.",
        precio: 0.85,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Pupusas_with_curtido_and_salsa.jpg"
    },
    {
        id: 6,
        nombre: "Pupusa de ajo",
        descripcion: "Pupusa con un toque especial de ajo.",
        precio: 0.85,
        categoria: "Pupusas",
        emoji: "🫓",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Pupusas_con_curtido_y_salsa_El_Salvador.JPG"
    },
    {
        id: 7,
        nombre: "Chocolate caliente",
        descripcion: "Bebida caliente, dulce y reconfortante.",
        precio: 1.00,
        categoria: "Bebidas",
        emoji: "☕",
        imagen: "https://cdn.shopify.com/s/files/1/0589/7758/3280/files/pouring_hot_chocol.png?v=1759780959"
    },
    {
        id: 8,
        nombre: "Café",
        descripcion: "Café caliente para acompañar tus pupusas.",
        precio: 0.75,
        categoria: "Bebidas",
        emoji: "☕",
        imagen: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        nombre: "Café con leche",
        descripcion: "Café combinado con leche cremosa.",
        precio: 1.00,
        categoria: "Bebidas",
        emoji: "🥛",
        imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        nombre: "Horchata",
        descripcion: "Fresco tradicional de arroz y especias.",
        precio: 0.75,
        categoria: "Bebidas",
        emoji: "🥤",
        imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        nombre: "Fresco de tamarindo",
        descripcion: "Bebida refrescante de tamarindo.",
        precio: 0.75,
        categoria: "Bebidas",
        emoji: "🥤",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamarind_drink.jpg"
    },
    {
        id: 12,
        nombre: "Fresco de jamaica",
        descripcion: "Fresco de flor de jamaica, dulce y refrescante.",
        precio: 0.75,
        categoria: "Bebidas",
        emoji: "🥤",
        imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        nombre: "Limonada",
        descripcion: "Bebida de limón ideal para acompañar tu comida.",
        precio: 0.75,
        categoria: "Bebidas",
        emoji: "🍋",
        imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/dennys_lemonade.jpg"
    },
    {
        id: 14,
        nombre: "Agua embotellada",
        descripcion: "Agua pura para refrescarte.",
        precio: 0.50,
        categoria: "Bebidas",
        emoji: "💧",
        imagen: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 15,
        nombre: "Curtido extra",
        descripcion: "Porción adicional de curtido tradicional.",
        precio: 0.25,
        categoria: "Extras",
        emoji: "🥗",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Condiments_for_Pupusas_in_El_Salvador_2012.jpg"
    }
];

// Datos del sistema
let carrito = [];
let pedidos = JSON.parse(localStorage.getItem("pedidosPupuseria")) || [];

const menu = document.getElementById("menu");

// Formato de precios
function dinero(cantidad) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(cantidad);
}

// Evitar insertar texto HTML no deseado
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}

// Mostrar productos del menú
function mostrarMenu(filtro = "") {
    const texto = filtro.trim().toLocaleLowerCase("es");

    const encontrados = productos.filter(producto =>
        producto.nombre.toLocaleLowerCase("es").includes(texto) ||
        producto.descripcion.toLocaleLowerCase("es").includes(texto) ||
        producto.categoria.toLocaleLowerCase("es").includes(texto)
    );

    document.getElementById("sinResultados")
        ?.classList.toggle("oculto", encontrados.length > 0);

    if (!menu) return;

    menu.innerHTML = encontrados.map(producto => `
        <article class="producto">
            <div class="producto-imagen">
                <img
                    src="${escaparHTML(producto.imagen)}"
                    alt="${escaparHTML(producto.nombre)}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.classList.add('imagen-fallida'); this.parentElement.textContent='${producto.emoji}';"
                >
            </div>

            <div class="producto-contenido">
                <h3>${escaparHTML(producto.nombre)}</h3>
                <p>${escaparHTML(producto.descripcion)}</p>

                <div class="producto-pie">
                    <span class="precio">${dinero(producto.precio)}</span>
                    <button
                        type="button"
                        class="boton-agregar"
                        data-agregar="${producto.id}"
                    >
                        + Agregar
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === Number(id));

    if (!producto) return;

    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

// Cambiar cantidad de un producto
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === Number(id));

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== Number(id));
    }

    mostrarCarrito();
}

// Calcular total del carrito
function calcularTotal() {
    return carrito.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
    );
}

// Mostrar el carrito
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");
    const vacio = document.getElementById("carritoVacio");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");
    const cantidad = document.getElementById("cantidadCarrito");

    if (contenedor) {
        contenedor.innerHTML = carrito.map(producto => `
            <div class="item-carrito">
                <div class="item-carrito-info">
                    <h4>${escaparHTML(producto.nombre)}</h4>
                    <p>${dinero(producto.precio)} cada uno</p>
                </div>

                <div class="controles-cantidad">
                    <button
                        type="button"
                        data-cambiar="${producto.id}"
                        data-cambio="-1"
                        aria-label="Quitar uno"
                    >−</button>

                    <span>${producto.cantidad}</span>

                    <button
                        type="button"
                        data-cambiar="${producto.id}"
                        data-cambio="1"
                        aria-label="Agregar uno"
                    >+</button>
                </div>

                <strong>
                    ${dinero(producto.precio * producto.cantidad)}
                </strong>
            </div>
        `).join("");
    }

    if (vacio) {
        vacio.classList.toggle("oculto", carrito.length > 0);
    }

    const totalProductos = carrito.reduce(
        (suma, producto) => suma + producto.cantidad,
        0
    );

    if (subtotal) subtotal.textContent = dinero(calcularTotal());
    if (total) total.textContent = dinero(calcularTotal());
    if (cantidad) cantidad.textContent = totalProductos;
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

// Registrar un pedido
function registrarPedido(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
        alert("Agrega al menos un producto antes de registrar el pedido.");
        return;
    }

    const campoNombre = document.getElementById("nombreCliente");
    const campoTipo = document.getElementById("tipoPedido");
    const campoNotas = document.getElementById("notasPedido");

    const nombre = campoNombre?.value.trim() || "";
    const tipo = campoTipo?.value || "Para llevar";
    const notas = campoNotas?.value.trim() || "";

    if (!nombre) {
        alert("Escribe el nombre del cliente.");
        campoNombre?.focus();
        return;
    }

    const pedido = {
        id: Date.now(),
        cliente: nombre,
        tipo: tipo,
        notas: notas,
        productos: carrito.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad
        })),
        total: calcularTotal(),
        estado: "Pendiente",
        fecha: new Date().toLocaleString("es-SV")
    };

    pedidos.unshift(pedido);
    guardarPedidos();

    carrito = [];
    mostrarCarrito();
    mostrarPedidos();

    document.getElementById("formularioPedido")?.reset();

    alert("¡Pedido registrado correctamente!");
}

// Guardar los pedidos en el navegador
function guardarPedidos() {
    localStorage.setItem("pedidosPupuseria", JSON.stringify(pedidos));
}

// Mostrar el historial de pedidos
function mostrarPedidos() {
    const contenedor = document.getElementById("listaPedidos");
    const vacio = document.getElementById("pedidosVacios");
    const contador = document.getElementById("totalPedidos");

    if (contador) {
        contador.textContent = pedidos.length;
    }

    if (vacio) {
        vacio.classList.toggle("oculto", pedidos.length > 0);
    }

    if (!contenedor) return;

    contenedor.innerHTML = pedidos.map(pedido => `
        <article class="pedido">
            <div class="pedido-cabecera">
                <div>
                    <h3>Pedido #${pedido.id}</h3>
                    <p>${escaparHTML(pedido.fecha)}</p>
                </div>

                <span class="estado-pedido">
                    ${escaparHTML(pedido.estado)}
                </span>
            </div>

            <p><strong>Cliente:</strong> ${escaparHTML(pedido.cliente)}</p>
            <p><strong>Tipo:</strong> ${escaparHTML(pedido.tipo)}</p>

            <ul>
                ${pedido.productos.map(producto => `
                    <li>
                        ${producto.cantidad} ×
                        ${escaparHTML(producto.nombre)}
                        — ${dinero(producto.precio * producto.cantidad)}
                    </li>
                `).join("")}
            </ul>

            ${pedido.notas ? `
                <p><strong>Notas:</strong> ${escaparHTML(pedido.notas)}</p>
            ` : ""}

            <p class="pedido-total">
                Total: ${dinero(pedido.total)}
            </p>

            <div class="acciones-pedido">
                <button
                    type="button"
                    data-estado="${pedido.id}"
                >
                    Cambiar estado
                </button>

                <button
                    type="button"
                    data-eliminar="${pedido.id}"
                >
                    Eliminar
                </button>
            </div>
        </article>
    `).join("");
}

// Cambiar el estado de un pedido
function cambiarEstadoPedido(id) {
    const pedido = pedidos.find(item => item.id === Number(id));

    if (!pedido) return;

    const estados = ["Pendiente", "En preparación", "Entregado"];
    const posicion = estados.indexOf(pedido.estado);

    pedido.estado = estados[(posicion + 1) % estados.length];

    guardarPedidos();
    mostrarPedidos();
}

// Eliminar un pedido del historial
function eliminarPedido(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este pedido?");

    if (!confirmar) return;

    pedidos = pedidos.filter(item => item.id !== Number(id));

    guardarPedidos();
    mostrarPedidos();
}

// Eventos del menú, carrito e historial
document.addEventListener("click", evento => {
    const botonAgregar = evento.target.closest("[data-agregar]");
    const botonCambiar = evento.target.closest("[data-cambiar]");
    const botonEstado = evento.target.closest("[data-estado]");
    const botonEliminar = evento.target.closest("[data-eliminar]");
    const botonVaciar = evento.target.closest("#btnVaciarCarrito");

    if (botonAgregar) {
        agregarAlCarrito(botonAgregar.dataset.agregar);
    }

    if (botonCambiar) {
        cambiarCantidad(
            botonCambiar.dataset.cambiar,
            Number(botonCambiar.dataset.cambio)
        );
    }

    if (botonEstado) {
        cambiarEstadoPedido(botonEstado.dataset.estado);
    }

    if (botonEliminar) {
        eliminarPedido(botonEliminar.dataset.eliminar);
    }

    if (botonVaciar) {
        vaciarCarrito();
    }
});

// Buscar productos
document.getElementById("buscarProducto")?.addEventListener("input", evento => {
    mostrarMenu(evento.target.value);
});

// Enviar formulario del pedido
document.getElementById("formularioPedido")
    ?.addEventListener("submit", registrarPedido);

// Iniciar el sistema
mostrarMenu();
mostrarCarrito();
mostrarPedidos();
