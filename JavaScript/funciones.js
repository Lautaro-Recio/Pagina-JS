/* Funcion de cuotas */
function pagoEnCuotas(){
    cuotas = (parseInt(prompt("Ingrese el numero de cuotas que quiere abonar entre 1, 3(sin interes), 6, 9 y12")))
    switch(cuotas){
        case 1:{
        
            alert("Al elegir esta opcion debera abonar $" + precioCuotas );
            break
        }
        case 3:{
            primerEntrega=precioCuotas-(precioCuotas/100*50);
            montoEnCuotas=(primerEntrega/2);
            alert("Al elegir esta opcion debera abonar $" + primerEntrega + " mas 2 Cuotas de $" + montoEnCuotas  );
            break
        }
        case 6:{
            primerEntrega= precioCuotas-(precioCuotas/100*50);
            montoEnCuotas=(primerEntrega/5)+(primerEntrega/100*10);;
            alert("Al elegir esta opcion debera abonar $" + primerEntrega + " mas 5 Cuotas de $" + montoEnCuotas  );
            break
        }
        case 9:{
            primerEntrega=precioCuotas-(precioCuotas/100*50);
            montoEnCuotas=(primerEntrega/8)+(primerEntrega/100*12);
            alert("Al elegir esta opcion debera abonar $" + primerEntrega + " mas 8 Cuotas de $" + montoEnCuotas  );
            break
        }
        case 12:{
            primerEntrega=precioCuotas-(precioCuotas/100*50);
            montoEnCuotas=(primerEntrega/11)+(primerEntrega/100*15);;
            alert("Al elegir esta opcion debera abonar $" + primerEntrega + " mas 11 Cuotas de $" + montoEnCuotas  );
            break   
        }
        default : {
            alert("No ingreso un numero de cuotas pertinente")
        }

    }
}

/* Funcion de Agregar al carrito */
function filas(elemento){
    //crear las filas con sus celdas
    let fila = document.createElement("tr");
    fila.setAttribute("id","trTabla"+1)
    //plantillas literales
    fila.innerHTML = `<td class="elementoTablas"> ID=${elemento.id}</td>
    <td><img class="compras" src=${elemento.imgs}></td>
    <td class="elementoTablas">${elemento.prod}</td>
    <td class="elementoTablas"><b>$ ${elemento.precio}</b></td>
    <td class="elementoTablas"><input type="number" id="multiplicador"></input></td>
    <td class="elementoTablas"><button id="borrar" class="agregar ">x</button></td>`;
    tablaBody.appendChild(fila);
    tabla.appendChild(tablaBody);
    document.getElementById("carro").appendChild(tabla);
}
/* Fin Funcion */

/* Fin Funciones */

/* Agregar al carrito */
function calcular(){
    let multiplicador = document.getElementById("multiplicador").value;
    let total = (multiplicador*producto.precio);
    console.log(total)
}
/* Fin Funcion */

function eliminar(){
    let tabla = document.getElementById("trTabla");
    console.log(tabla)
    tabla.parentNode.removeChild(trTabla)
    precioCuotas=(precioCuotas-productos.precio)
    total.innerHTML= `Total: $${precioCuotas}`
} 

/* Agregar al carrito */
const addToCart = (producto) => {
    carrito.push(producto)
    console.log(carrito)
    localStorage.setItem("cart", JSON.stringify(carrito))
    filas(producto)
    precioCuotas=(precioCuotas+producto.precio)
    console.log(precioCuotas)
    total.innerHTML= `Total: $${precioCuotas}`

    let sacar = document.getElementById("borrar");
    sacar.addEventListener("click", eliminar)
}

/* Vaciar carrito */
function vaciarCarrito(){
    let tabla=document.getElementById("tabla")
    tabla.parentNode.removeChild(tabla)
    total.innerHTML= `Total: $ `
    carrito=[];
    console.log(carrito);
    localStorage.clear( );
}


let agregar = document.getElementById("zapatillas")
console.log(agregar)
agregar.addEventListener("click",cates)

function cates () {
    switch (agregar){
        case bolsos :{
            console.log("bolsos");
            break;
        }
        case zapatillas:{
            console.log("zapatillas");
            break;
        }
        case accesorios :{
            console.log("accesorios");
            break;
        }
        case pelotas :{
            console.log("pelotas");
            break;
        }
    }
}