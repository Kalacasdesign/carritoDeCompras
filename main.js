let carrito = [];
let total = 0;


function agregarElemento(tag, atributos = {}, contenido = '') {
    const elemento = document.createElement(tag);

    
    Object.keys(atributos).forEach(attr => elemento.setAttribute(attr, atributos[attr]));

  
    if (contenido) {
        elemento.innerHTML = contenido;
    }

    return elemento;
}


const header = agregarElemento('header');
header.appendChild(agregarElemento('h1', {}, 'Bienvenido a Libélula Artesanías'));
header.appendChild(agregarElemento('p', {}, 'Elige tus productos favoritos:'));
document.body.appendChild(header);

const main = agregarElemento('main');
const seccionProductos = agregarElemento('section', { id: 'productos' });
const seccionCarrito = agregarElemento('section', { id: 'carrito' });

main.appendChild(seccionProductos);
main.appendChild(seccionCarrito);
document.body.appendChild(main);


async function cargarProductos() {
    try {
        const respuesta = await fetch('productos.json');
        const productos = await respuesta.json();
        renderizarProductos(productos); 
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


function renderizarProductos(productos) {
    productos.forEach(producto => {
        const divProducto = agregarElemento('div', { class: 'producto' });
        divProducto.appendChild(agregarElemento('img', { src: producto.imagen, alt: producto.nombre }));
        divProducto.appendChild(agregarElemento('h2', {}, producto.nombre));
        divProducto.appendChild(agregarElemento('p', {}, `Precio: $${producto.precio}`));

       
        const inputCantidad = agregarElemento('input', {
            type: 'number',
            min: '1',
            value: '1',
            class: 'cantidad-producto',
            placeholder: 'Cantidad'
        });
        divProducto.appendChild(inputCantidad);

       
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
}


function agregarAlCarrito(producto, precio, imagen, cantidad) {
    const productoEnCarrito = carrito.find(item => item.producto === producto);

    if (productoEnCarrito) {
        
        productoEnCarrito.cantidad += cantidad;
    } else {
     
        carrito = [...carrito, { producto, precio, imagen, cantidad }];
    }

    total += precio * cantidad;

    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);  
    actualizarCarrito();
}


function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = ''; 

  
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li>Tu carrito está vacío</li>';
    } else {
        
        carrito.map(({ producto, precio, imagen, cantidad }) => {
            const li = agregarElemento('li');
            const img = agregarElemento('img', { src: imagen, alt: producto, width: '50' });
            const texto = agregarElemento('span', {}, `${producto} - $${precio} x ${cantidad} `);
            li.appendChild(img);
            li.appendChild(texto);
            listaCarrito.appendChild(li);
        });
    }

   
    document.getElementById('total').textContent = total.toFixed(2);
}



function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);  
    }

    if (totalGuardado) {
        total = parseFloat(totalGuardado);  
    }

    actualizarCarrito(); 
}


function finalizarCompra() {
    Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "Por favor, completa el siguiente formulario para continuar.",
        icon: "success"
    }).then(() => {
        mostrarFormulario();  

        
        localStorage.removeItem('carrito');
        localStorage.removeItem('total');
    });
}

function mostrarFormulario() {
   
    const overlay = agregarElemento('div', { id: 'overlay', class: 'overlay' });

  
    const formContainer = agregarElemento('div', { id: 'form-container', class: 'formulario-container' });

    const formTitle = agregarElemento('h3', { class: 'form-title' }, 'Completa tus datos:');
    formContainer.appendChild(formTitle);

    const form = agregarElemento('form', { class: 'formulario' });

    
    const nombreLabel = agregarElemento('label', { for: 'nombre', class: 'form-label' }, 'Nombre:');
    const nombreInput = agregarElemento('input', { type: 'text', id: 'nombre', name: 'nombre', class: 'form-input', required: true });
    form.appendChild(nombreLabel);
    form.appendChild(nombreInput);

 
    const direccionLabel = agregarElemento('label', { for: 'direccion', class: 'form-label' }, 'Dirección:');
    const direccionInput = agregarElemento('input', { type: 'text', id: 'direccion', name: 'direccion', class: 'form-input', required: true });
    form.appendChild(direccionLabel);
    form.appendChild(direccionInput);

    
    const emailLabel = agregarElemento('label', { for: 'email', class: 'form-label' }, 'Correo Electrónico:');
    const emailInput = agregarElemento('input', { type: 'email', id: 'email', name: 'email', class: 'form-input', required: true });
    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    
    const submitButton = agregarElemento('button', { type: 'submit', class: 'form-submit' }, 'Enviar');
    form.appendChild(submitButton);

    formContainer.appendChild(form);

   
    overlay.appendChild(formContainer);
    
   
    document.body.appendChild(overlay);

    
    form.onsubmit = (e) => {
        e.preventDefault();
        Swal.fire("¡Formulario enviado!", "Gracias por completar tus datos.", "success");

        
        vaciarCarrito();

        
        overlay.remove();
    };
}


function vaciarCarrito() {
    
    carrito = [];
    total = 0;

    
    actualizarCarrito();

    
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
}



function contactoCompra() {
    Swal.fire({
        title: "¡Gracias por tus datos!",
        text: "En breve , me estare comunicando.",
        icon: "success"
    }).then(() => {
        mostrarFormulario();  

        
        localStorage.removeItem('carrito');
        localStorage.removeItem('total');
    });
}



seccionCarrito.appendChild(agregarElemento('h2', {}, 'Carrito de Compras'));
seccionCarrito.appendChild(agregarElemento('ul', { id: 'lista-carrito' }));
seccionCarrito.appendChild(agregarElemento('p', {}, 'Total: $<span id="total">0</span>'));
const botonFinalizar = agregarElemento('button', {}, 'Finalizar compra');
botonFinalizar.onclick = finalizarCompra;
seccionCarrito.appendChild(botonFinalizar);


cargarProductos();
cargarCarritoDesdeLocalStorage();
