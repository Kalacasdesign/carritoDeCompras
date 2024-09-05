let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio}`;
        listaCarrito.appendChild(li);
    });

    document.getElementById('total').textContent = total;
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert(`Compra finalizada. Total a pagar: $${total}`);
        carrito = [];
        total = 0;
        actualizarCarrito();
    }
}
