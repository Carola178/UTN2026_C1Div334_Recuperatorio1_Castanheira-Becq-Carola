function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if(carrito == null){
        carrito = [];
    }
    return carrito;
}

function cargarProductosCarrito() {
    let carrito = obtenerCarrito();

    let tabla = document.getElementById("tabla-carrito");

    //reinicio la tabla dejando solo el encabezado
    tabla.innerHTML = `
        <tr class="fila-header-carrito">
            <td class="celda-header-tabla-carrito">Nombre del producto</td>
            <td class="celda-header-tabla-carrito">Cantidad</td>
            <td class="celda-header-tabla-carrito">Precio unitario</td>
        </tr>
    `;

    let totalFinal = 0;

    for(let i = 0; i < carrito.length; i++){

        let producto = carrito[i];

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
        </tr>
        `;

        totalFinal += producto.precio * producto.cantidad;
    }

    document.getElementById("valor-final").textContent =
    `El valor final a pagar es de: $${totalFinal}`;
}

function limpiarCarrito() {
    localStorage.removeItem("carrito");

    alert("Carrito limpiado correctamente");

    cargarProductosCarrito();
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});