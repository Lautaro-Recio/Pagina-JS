/* variable */

let producto;
let precio;
let productoFinal;
let precioCuotas=0;
let cuotas;
let primerEntrega = 0;
let montoEnCuotas; 
const listaFinal=[];
let prodSelecc;
let carrito = [];
console.log(carrito)
/* Fin de Variables */
/* FUNCIONES */   


/* Fin Funcion */



/* Vaciar Carrito */
let borrar = document.getElementById("borrar")
borrar.addEventListener("click",vaciarCarrito)

//tabla con DOM
let tabla = document.createElement("table");
tabla.setAttribute("class", "table table-striped");
tabla.setAttribute("id", "tabla");
let tablaBody = document.createElement("tbody");
let tr = document.createElement("tr");

/* Entrega: Generar HTML/mostrar tarjeta de producto */

for (const producto of productos) {
    let fila = document.createElement("div");
    fila.setAttribute("class", "col-md-3 col-xs-5 caja");
    fila.innerHTML = `
        <img class="imgProds" src="${producto.imgs}" alt="${producto.prod}" class="prods">
        <p class="nombreProd">${producto.prod}</p>
        <b><p class="precio">$${producto.precio}</p></b>
        <button id="addToCart" class="agregar aniBoton" onclick='addToCart(${JSON.stringify(producto)})'>Comprar</button>
        </button>    
    `;
    tabla.appendChild(fila);
   document.getElementById("tarjetas").appendChild(fila);
}

/* Borrar */

/* Eventos */

