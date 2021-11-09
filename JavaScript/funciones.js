    /* Funcion de cuotas */
    
    
    
    /* Es una funcion que tenia de antes que tengo que modificar */
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


    /! tabla con DOM !/
    let tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");
    tabla.setAttribute("id", "tabla");
    let tablaBody = document.createElement("tbody");
    let tr = document.createElement("tr");


    let div;
    /! Generacion de tablas !/
    function generar (Array){

        for (const producto of Array) {
            div = document.createElement("div");
            div.setAttribute("class", "col-md-3 col-xs-5 caja");
            div.setAttribute("id", "cajas");
            div.innerHTML = `
                <img class="imgProds" src="${producto.imgs}" alt="${producto.prod}" class="prods">
                <p class="nombreProd">${producto.prod}</p>
                <b><p class="precio">$${producto.precio}</p></b>
                <button id="addToCart" class="agregar aniBoton" onclick='addToCart(${JSON.stringify(producto)})'>Comprar</button>
                </button>    
            `;
            tabla.appendChild(div);

            /! Implementacion de jquery !/
            $("#tarjetas").append(div);
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
            div.innerHTML = `<button class="categorias animate__animated aniBoton animate__pulse"  onclick=cates(${JSON.stringify(producto.categorias)})>${(producto.categorias)}</button>`;
            
            /! Implementacion de jquery !/
            $("#categorias").append(div)
        }
    }
botones()


const buscador = document.querySelector("#datos")
/* Fin Funcion */
const buscar = () => {
    tarjetas.innerHTML=``
    const texto = buscador.value.toLowerCase();
    for( let producto of productos){
        let nombre = producto.prod.toLowerCase();

        if (nombre.indexOf(texto)!== -1){
            tarjetas.innerHTML += `<h1>HOLA</h1>`
        }

    }
}
buscador.addEventListener("keyup",buscar)



/* Agregar al carrito */
function calcular(multiplo){
    let multiplicador = document.getElementById("multiplicador").value;
    let total = (multiplicador*producto.precio);
    console.log(total)
}
/* Fin Funcion */

/* TOMA DE DATOS/JQUERY */

/* $("#datos").change */

class productoCarrito {
    constructor(obj) {
        this.id = obj.id;
        this.imgs = obj.imgs;
        this.prod = obj.prod;
        this.precio = obj.precio;
        this.categorias = obj.categorias;
        this.cantidad = 1;
    }
}


/* POSICION DEL ARRAY Y CANTIDAD */
let posicion;
let cantidad;
/* Agregar al carrito */
function addToCart(productoNuevo) {
    let encontrado = carrito.find(prod => prod.id == productoNuevo.id);
    console.log(encontrado)
    if (encontrado == undefined) {
        let productoAAgregar = new productoCarrito(productoNuevo);
        carrito.push(productoAAgregar);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.prod,
            'success'
        );
        $(tablaBody).append(`
        <tr id=${JSON.stringify(productoNuevo.id)}>
            <td class="elementoTablas"> ID=${productoNuevo.id}</td>
            <td><img class="compras" src=${productoNuevo.imgs}></td>
            <td class="elementoTablas">${productoNuevo.prod}</td>
            <td class="elementoTablas"><b id=${productoNuevo.prod}>$ ${productoNuevo.precio}</b></td>
            <td class="elementoTablas"><input type="number" value=1 id="multiplicador"></input></td>
            <td class="elementoTablas"><button onclick=eliminar(${JSON.stringify(productoNuevo.id)})>x</button></td>
        <tr>`);
            $(tabla).append(tablaBody)
            $("#carro").append(tabla)
            precioCuotas=precioCuotas+productoNuevo.precio
            console.log(precioCuotas)
            total.innerHTML= `Total: $${precioCuotas}`;
            posicion = carrito.findIndex(p => p.id == productoNuevo.id);
            console.log(posicion)
        } else {
            posicion = carrito.findIndex(p => p.id == productoNuevo.id);
            console.log(posicion);
            cantidad = carrito[posicion].cantidad += 1;
            console.log(cantidad)
            precioCuotas=(productoNuevo.precio*cantidad);
            total.innerHTML= `Total: $${precioCuotas}`;
            console.log(precioCuotas)
            document.getElementById("multiplicador").value = cantidad;
            let precio= document.getElementById("precio");
            console.log(precio.innerText)
            precio.innerText=`$${productoNuevo.precio*cantidad}`;
        }
}

/* ELIMINAR */

function eliminar(eliminado){
    alert(eliminado);
    let hola=document.getElementById(eliminado);
    tablaBody.removeChild(hola);
    cantidad=1;
    carrito.splice(posicion);
    /* Falta restar el precio eliminado */
    precioCuotas=(precioCuotas);
    console.log(precioCuotas)
    total.innerHTML= `Total: $${precioCuotas}`;

}   





    

    /* ELIMINAR */

    /* Vaciar carrito */
    function vaciarCarrito(){
        let tabla=document.getElementById("tabla");
        tabla.parentNode.removeChild(tabla);
        total.innerHTML= `Total: $ `;
        carrito=[];
        console.log(carrito);
        localStorage.clear( );
        tabla.innerHTML=` `;
        tablaBody.innerHTML=` `;
        precioCuotas=0
    }

    /* BOTON DE COMPRAR / CON JQUERY */
    $("#comprar").click( function ()
    {
        Swal.fire({
            title: 'Ingrese la cantidad de cuotas',
            input: 'number',
            confirmButtonText: 'Finalizar Compra',
            
        })
    });


    

    /* CATEGORIAS */
    function cates (cat) {
        console.log(cat)
        switch (cat){
            case "Zapatillas" :{
                let tarjetas= document.getElementById("tarjetas");
                tarjetas.innerHTML=``;
                let Zapatillas = productos.filter(function(cats) {
                    return cats.categorias === "Zapatillas";
                })
                generar(Zapatillas);
                break;
            }
            case "Bolsos" :{
                let tarjetas= document.getElementById("tarjetas");
                tarjetas.innerHTML=``;
                let Bolsos = productos.filter(function(cats) {
                    return cats.categorias === "Bolsos";
                })
                generar(Bolsos);
                break;
            }
            case "Accesorios" :{
                let tarjetas= document.getElementById("tarjetas")
                tarjetas.innerHTML=``
                let Accesorios = productos.filter(function(cats) {
                    return cats.categorias === "Accesorios";
                })
                generar(Accesorios);
                break;
            }
            case "Pelotas" :{
                let tarjetas= document.getElementById("tarjetas");
                tarjetas.innerHTML=``;
                let Pelotas = productos.filter(function(cats) {
                    return cats.categorias === "Pelotas";
                })
                generar(Pelotas);
                break;
            }
            default :{
                console.log("ERROR");
                break;
            }
        }
    }