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

/! Generacion de tablas !/
function generar (Array){

    for (const producto of Array) {
        let fila = document.createElement("div");
        fila.setAttribute("class", "col-md-3 col-xs-5 caja");
        fila.setAttribute("id", "cajas");
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
}

/!BOTONES DE CATEGORIAS!/
function botones (elemento){
    let boton = productos.slice(0,4)
    for (const producto of boton){
        let div=document.createElement("div");
        div.setAttribute("class", "col-md-3 col-xs-5");
        div.setAttribute("id", "cajas");
        //plantillas literales
        div.innerHTML = `<button class="categorias aniBoton"  onclick=cates(${JSON.stringify(producto.categorias)})>${(producto.categorias)}</button>`;
        document.getElementById("categorias").appendChild(div)
    }   
}
botones()

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


/* let agregar = document.getElementById("Zapatillas")
console.log(agregar)
agregar.onclick(cates) */

function cates (cat) {
    console.log(cat)
    switch (cat){
        case "Zapatillas" :{
            let tarjetas= document.getElementById("tarjetas")
            tarjetas.innerHTML=``
            let Zapatillas = productos.filter(function(cats) {
                return cats.categorias === "Zapatillas";
            })
            generar(Zapatillas)
            break;
        }
        case "Bolsos" :{
            let tarjetas= document.getElementById("tarjetas")
            tarjetas.innerHTML=``
            let Bolsos = productos.filter(function(cats) {
                return cats.categorias === "Bolsos";
            })
            generar(Bolsos)
            break;
        }
        case "Accesorios" :{
            let tarjetas= document.getElementById("tarjetas")
            tarjetas.innerHTML=``
            let Accesorios = productos.filter(function(cats) {
                return cats.categorias === "Accesorios";
            })
            generar(Accesorios)
            break;
        }
        case "Pelotas" :{
            let tarjetas= document.getElementById("tarjetas")
            tarjetas.innerHTML=``
            let Pelotas = productos.filter(function(cats) {
                return cats.categorias === "Pelotas";
            })
            generar(Pelotas)
            break;
        }
        default :{
            console.log("ERROR")
            break;
        }
    }
}