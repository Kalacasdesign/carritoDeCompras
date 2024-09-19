// Productos disponibles en la tienda
const productos = [
    { nombre: "Pintorcitos", precio: 100, imagen: "img/pintorcito.jpg" },
    { nombre: "Fundas para cuadernos", precio: 50, imagen: "img/fundas para cuadernos.png" },
    { nombre: "Matero", precio: 150, imagen: "img/matero.png" },
    { nombre: "Cartucheras", precio: 75, imagen: "img/cartuchera.jpeg" },
    { nombre: "Porta pinceles", precio: 120, imagen: "img/porta pinceles.jpg" }
];

let carrito = [];
let total = 0;

// Función para crear y agregar un elemento al DOM
function agregarElemento(tag, atributos = {}, contenido = '') {
    const elemento = document.createElement(tag);

    // Asignar atributos
    Object.keys(atributos).forEach(attr => elemento.setAttribute(attr, atributos[attr]));

    // Asignar contenido si lo hay
    if (contenido) {
        elemento.innerHTML = contenido;
    }

    return elemento;
}

// Crear la estructura básica del HTML (header, main)
const header = agregarElemento('header');
header.appendChild(agregarElemento('h1', {}, 'Bienvenido a Libélula Artesanías'));
header.appendChild(agregarElemento('p', {}, 'Elige tus productos favoritos:'));
document.body.appendChild(header);

const main = agregarElemento('main');
const seccionProductos = agregarElemento('section', { id: 'productos' });
const seccionCarrito = agregarElemento('section', { id: 'carrito' });

// Agregar productos a la sección de productos
productos.forEach(producto => {
    const divProducto = agregarElemento('div', { class: 'producto' });
    divProducto.appendChild(agregarElemento('img', { src: producto.imagen, alt: producto.nombre }));
    divProducto.appendChild(agregarElemento('h2', {}, producto.nombre));
    divProducto.appendChild(agregarElemento('p', {}, `Precio: $${producto.precio}`));

    // Crear campo de entrada para la cantidad
    const inputCantidad = agregarElemento('input', {
        type: 'number',
        min: '1',
        value: '1',
        class: 'cantidad-producto',
        placeholder: 'Cantidad'
    });
    divProducto.appendChild(inputCantidad);

    // Botón para agregar al carrito
    const boton = agregarElemento('button', {}, 'Agregar al carrito');
    boton.onclick = () => {
        const cantidad = parseInt(inputCantidad.value);
        if (!isNaN(cantidad) && cantidad > 0) {
            agregarAlCarrito(producto.nombre, producto.precio, producto.imagen, cantidad);
        } else {
            alert('Por favor, ingresa una cantidad válida.');
        }
    };
    divProducto.appendChild(boton);

    seccionProductos.appendChild(divProducto);
});

main.appendChild(seccionProductos);

// Agregar la sección del carrito
seccionCarrito.appendChild(agregarElemento('h2', {}, 'Carrito de Compras'));
seccionCarrito.appendChild(agregarElemento('ul', { id: 'lista-carrito' }));
seccionCarrito.appendChild(agregarElemento('p', {}, 'Total: $<span id="total">0</span>'));
const botonFinalizar = agregarElemento('button', {}, 'Finalizar compra');
botonFinalizar.onclick = finalizarCompra;
seccionCarrito.appendChild(botonFinalizar);

main.appendChild(seccionCarrito);

// Agregar main al body
document.body.appendChild(main);

// Funciones JavaScript
function agregarAlCarrito(producto, precio, imagen, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        carrito = [...carrito, { producto, precio, imagen }];
    }
    total += precio * cantidad;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(({ producto, precio, imagen }) => {
        const li = agregarElemento('li');
        const img = agregarElemento('img', { src: imagen, alt: producto, width: '50' });
        const texto = agregarElemento('span', {}, `${producto} - $${precio}`);
        li.appendChild(img);
        li.appendChild(texto);
        listaCarrito.appendChild(li);
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizarCompra() {
    carrito.length === 0
        ? alert('El carrito está vacío.')
        : alert(`Compra finalizada. Total a pagar: $${total.toFixed(2)}`);

    carrito = [];
    total = 0;
    actualizarCarrito();
}
