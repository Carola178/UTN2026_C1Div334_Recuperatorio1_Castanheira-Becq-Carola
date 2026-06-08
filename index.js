//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if(carrito == null){
        carrito = [];
    }
    return carrito;
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

//--- Funcion que actualiza el contador de productos en el carrito ---//
function actualizarContadorCarrito() {
    
    let carrito = obtenerCarrito();

    let total = 0;

    carrito.forEach(producto => {
        total += producto.cantidad;
    });

    document.querySelector("#cantidad-carrito").textContent = total;
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let carrito = obtenerCarrito();

    let elementoClickeado = e.target;

    let productoHTML = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");

    let nombre = productoHTML.querySelector(".nombre-producto").textContent;
    
    let precio = parseFloat(
        productoHTML
        .querySelector(".precio-producto")
        .textContent
        .replace("$", "")
    );

    //busco si ya existe
    let productoEncontrado = carrito.find(p => p.nombre === nombre);

    //si existe aumento cantidad
    if(productoEncontrado){
        productoEncontrado.cantidad++;
    }else{

    //si no existe lo creo
    let producto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1
        };

        carrito.push(producto);
    }

    console.log(carrito);

    guardarCarrito(carrito);

    alert(`Un/una:  ${nombre} fue agregado al carrito`);
}



function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//

    let carrito = obtenerCarrito();

    //si el carrito esta vacio
    if(carrito.length === 0){

        alert("No hay ningún producto guardado en el carrito");

        return;
    }    

    let elementoClickeado = e.target;

    let productoHTML = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");

    //obtengo nombre
    let nombre = productoHTML.querySelector(".nombre-producto").textContent;

    //busco producto
    let productoEncontrado = carrito.find(p => p.nombre === nombre);

    //si no existe
    if(!productoEncontrado){

        alert(`No hay más ${nombre} en el carrito`);

        return;
    }
    
    productoEncontrado.cantidad--;

    alert(`Un/una: ${nombre} fue eliminado del carrito`);
    
    carrito = carrito.filter(p => p.cantidad > 0);

    console.log(carrito);

    guardarCarrito(carrito);
}



//--- Funcion para ordenar productos de mayor a menor precio ---//
function ordenarMayorAMenor(e) {

    let section = e.target.closest("section");

    let listado = section.querySelector("ul");

    let productos = Array.from(listado.children);

    productos.sort((a, b) => {

        let precioA = parseFloat(
            a.querySelector(".precio-producto")
            .textContent
            .replace("$", "")
        );

        let precioB = parseFloat(
            b.querySelector(".precio-producto")
            .textContent
            .replace("$", "")
        );

        return precioB - precioA;
    });

    productos.forEach(producto => {
        listado.appendChild(producto);
    });
}



//--- Funcion para ordenar productos de menor a mayor precio ---//
function ordenarMenorAMayor(e) {

    let section = e.target.closest("section");

    let listado = section.querySelector("ul");

    let productos = Array.from(listado.children);

    productos.sort((a, b) => {

        let precioA = parseFloat(
            a.querySelector(".precio-producto")
            .textContent
            .replace("$", "")
        );

        let precioB = parseFloat(
            b.querySelector(".precio-producto")
            .textContent
            .replace("$", "")
        );

        return precioA - precioB;
    });

    productos.forEach(producto => {
        listado.appendChild(producto);
    });
}

//--- Funcion para mostrar/ocultar las calorías de las hamburguesas ---//
function toggleCalorias(e) {

    let producto = e.target.closest(".li-hamburguesa");

    let calorias = producto.querySelector(".calorias-producto");

    if(calorias.style.display === "none")
    {
        calorias.style.display = "block";
    }
    else
    {
        calorias.style.display = "none";
    }
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
    const botonesOrdenarMayor = document.querySelectorAll(".btn-ordenar-mayor");
    const botonesOrdenarMenor = document.querySelectorAll(".btn-ordenar-menor");
    const botonesCalorias = document.querySelectorAll(".btn-calorias");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
    botonesOrdenarMayor.forEach(btn => btn.addEventListener("click", ordenarMayorAMenor));
    botonesOrdenarMenor.forEach(btn => btn.addEventListener("click", ordenarMenorAMayor));
    botonesCalorias.forEach(btn => btn.addEventListener("click", toggleCalorias));

    // Actualizar el contador al cargar la página
    actualizarContadorCarrito();
});
