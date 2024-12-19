document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const carrito = [];
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const mensajeCompra = document.getElementById('mensaje-compra');
    const btnComprar = document.createElement('a');
    btnComprar.href = '#';
    btnComprar.classList.add('btn-2');
    btnComprar.textContent = 'Comprar';
    document.body.appendChild(btnComprar);

    // Función para agregar productos al carrito
    function agregarProductoAlCarrito(id, nombre, precio, imagen) {
        carrito.push({ id, nombre, precio, imagen });

        // Actualiza la vista del carrito
        actualizarCarrito();
    }

    // Función para actualizar el carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = ''; // Limpia la tabla

        carrito.forEach((producto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button class="btn-2" onclick="eliminarProducto(${index})">Eliminar</button></td>
            `;
            listaCarrito.appendChild(row);
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito.length = 0; // Vacía el carrito
        actualizarCarrito();
    }

    // Función para realizar la compra
    function realizarCompra() {
        if (carrito.length > 0) {
            // Muestra el mensaje de compra
            mensajeCompra.style.display = 'block';

            // Vaciar el carrito
            vaciarCarrito();

            // Después de 3 segundos, ocultar el mensaje de compra
            setTimeout(() => {
                mensajeCompra.style.display = 'none';
            }, 3000); // El mensaje se ocultará después de 3 segundos
        } else {
            alert("El carrito está vacío");
        }
    }

    // Evento para el botón "Vaciar carrito"
    vaciarCarritoBtn.addEventListener('click', () => {
        vaciarCarrito();
    });

    // Evento para el botón "Comprar"
    btnComprar.addEventListener('click', realizarCompra);

    // Evento para agregar productos al carrito
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const productoId = boton.getAttribute('data-id');
            const nombreProducto = boton.closest('.product').querySelector('h3').textContent;
            const precioProducto = boton.closest('.product').querySelector('.Precio').textContent;
            const imagenProducto = boton.closest('.product').querySelector('img').src;

            // Agregar producto al carrito
            agregarProductoAlCarrito(productoId, nombreProducto, precioProducto, imagenProducto);
        });
    });
});
