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
var carrito = [];
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

/*mostrar tarjeta de producto */
generar(productos)
/* Eventos */

