    /* Funcion de cuotas */
    

    /* ESCONDE EL BOTON COMPRAR */
    $("#comprar").hide()
    
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
        let boton = productos.slice(0,5)
        for (const producto of boton){
            let div=document.createElement("div");
            div.setAttribute("class", "col-md-4 col-xs-5");
            div.setAttribute("id", "cajas");
            //plantillas literales
            div.innerHTML = `<button class="categorias animate__animated aniBoton animate__pulse"  onclick=cates(${JSON.stringify(producto.categorias)})>${(producto.categorias)}</button>`;
            
            /! Implementacion de jquery !/
            $("#categorias").append(div)
        }
        let div=document.createElement("div");
            div.setAttribute("class", "col-md-4 col-xs-5");
            div.setAttribute("id", "cajas");
            //plantillas literales
            div.innerHTML = `<button class="categorias animate__animated aniBoton animate__pulse"  id="todo">Todos los productos</button>`;
            $("#categorias").append(div)
    }

   
  /* GENERACION DE BOTONES */ 
    botones()

    $("#todo").click(
        function mostrarTodos(){
            tarjetas.innerHTML =``
            generar(productos)
        }
    )


const buscador = document.querySelector("#datos")
/* Fin Funcion */
const buscar = () => {
    tarjetas.innerHTML=``
    const texto = buscador.value.toLowerCase();
    for( let producto of productos){
        let nombre = producto.prod.toLowerCase();
        if (nombre.indexOf(texto)!== -1){
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
        if (tarjetas.innerHTML==""){
            let prodNo= document.createElement("h6")
            prodNo.setAttribute("class", "prodNO")
            prodNo.textContent=`Producto no encontrado...`
            $("#tarjetas").append(prodNo);
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
    if (encontrado == undefined) {
        let productoAAgregar = new productoCarrito(productoNuevo);
        carrito.push(productoAAgregar);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.prod,
            'success'
        );
        $(tablaBody).append(`
        <tr id=${JSON.stringify(productoNuevo.id)}>
            <td class=""> ID=${productoNuevo.id}</td>
            <td class="elementoTablas"><img class="compras" src=${productoNuevo.imgs}></td>
            <td class="elementoTablas">${productoNuevo.prod}</td>
            <td class="elementoTablas"><b id=${productoNuevo.precio}>$ ${productoNuevo.precio}</b></td>
            <td class="elementoTablas"><input type="number" value=1 id="${productoNuevo.prod}"></input></td>
            <td class="elementoTablas"><button onclick=eliminar(${JSON.stringify(productoNuevo.precio)})>x</button></td>
        <tr>`);
            $(tabla).append(tablaBody)
            $("#carro").append(tabla)
            precioCuotas=precioCuotas+productoNuevo.precio
            total.innerHTML= `Total: $${precioCuotas}`;
            posicion = carrito.findIndex(p => p.id == productoNuevo.id);
            /! ANIMACIONES CONCATENADAS!/
            $("#comprar").show(2000)
            .css("background-color", "green")
            .animate({
                width:`250px`,
                height:`150px`,
            })
            
        } else {
            posicion = carrito.findIndex(p => p.id == productoNuevo.id);
            cantidad = carrito[posicion].cantidad += 1;
            precioCuotas=precioCuotas+productoNuevo.precio;
            total.innerHTML= `Total: $${precioCuotas}`;
            document.getElementById(productoNuevo.prod).value = cantidad;
            console.log(productoNuevo.precio)
            let precio= document.getElementById(productoNuevo.precio);
            precio.innerText=`$${productoNuevo.precio*cantidad}`;
        }
}

/* ELIMINAR */

function eliminar(eliminado){
    let hola=document.getElementById(eliminado);
    tablaBody.removeChild(hola);
    cantidad=1;
    carrito.splice(posicion);
    /* Falta restar el precio eliminado */
    precioCuotas=(precioCuotas-eliminado);
    console.log(precioCuotas)
    total.innerHTML= `Total: $${precioCuotas}`;

}   


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
        $("#comprar").hide(2000)
       
        
    }

    /* BOTON DE COMPRAR / CON JQUERY */
    $("#comprar").click( function ()
    {   
     
        $("#formulario").attr("class","col-md-12 col-xs-12 borde")
        $("#formulario").append(`
            <form id="miForm">
                <div class="col-md-12 col-xs-12">
                    <label class="label1">
                        <h4>Ingrese sus datos</h4>

                        <input type="text" class="textForm" id="nombre" placeholder="Nombre...">
                        <br>
                        <input type="text" class="textForm" id="apellido" placeholder="Apellido...">
                        <br> 
                        <input type="text" class="textForm" id="direccion" placeholder="Direccion...">
                        <br>
                        <input type="text" class="textForm" id="gmail" placeholder="Gmail...">
                        <br>
                        <input type="text" class="textForm" id="nro" placeholder="Nro de contacto...">
                        <p id="faltantes" class="faltantes"></p>
                    </label>
                
                    <label class="label2">
                        <h4>Seleccione su plan de pago</h4>
                        <input type="radio" value="1" class="cuotas" name="cuotas" id="cuotas1"> Pago Total
                        <br>
                        <input type="radio" value="3" class="cuotas" name="cuotas" id="cuotas2"> 3 Cuotas sin interes
                        <br>
                        <input type="radio" value="6" class="cuotas" name="cuotas" id="cuotas3"> 6 Cuotas
                        <br>
                        <input type="radio" value="9" class="cuotas" name="cuotas" id="cuotas4"> 9 Cuotas
                        <br>
                        <input type="radio" value="12" class="cuotas" name="cuotas" id="cuotas5"> 12 Cuotas

                        <p id="totalCuotas" class="totalCuotas"></p>
                        
                    </label>
                </div>
                    <br>
                <label class="label3"> 
                    <button class="botonesForm" id="enviar" type="submit">Enviar </button>
                    <button class="botonesForm" type="reset">Limpiar </button>
                </label>
            </form>
        `)


        $("#miForm").submit(function(e){
            e.preventDefault();
            /* VALIDAR LOS INPUT TEXT */
            let nom=$("#nombre").val()
            let ape=$("#apellido").val()
            let direccion=$("#direccion").val()
            let mail=$("#gmail").val()
            let nro=$("#nro").val()
            
            /* VALIDACION SI ESTAN VACIOS LOS INPUTS */
            if ((nom === "") || (ape === "") || (mail === "") || (direccion === "") || (nro === "")) {
                $("#faltantes").append("Rellene los campos faltantes")
            }else{
                console.log(nom,ape,direccion,mail,nro)
                Swal.fire(
                    $("#nombre").val(),
                    '¡Tu pedido esta en camino!',
                    'success',
                );
            };
        })
        /* FALTA RETOCAR ALGUNAS COSAS */
        $(document).ready(function(){  
  
            $(".cuotas").click(function() {  
                if($("#cuotas1").is(':checked')) {  
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas1").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas))                    
                } else if ($("#cuotas2").is(':checked')){ 
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas2").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas3").is(':checked')){ 
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas3").val(); 
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas4").is(':checked')){ 
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas4").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas5").is(':checked')){ 
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas5").val();  
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } 
            });  
          
        });
    });

    /* CATEGORIAS */
    function cates (cat) {
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
            case "Entrenamiento" :{
                let tarjetas= document.getElementById("tarjetas");
                tarjetas.innerHTML=``;
                let Zapatillas = productos.filter(function(cats) {
                    return cats.categorias === "Entrenamiento";
                })
                generar(Zapatillas);
                break;
            }
            default :{
                console.log("ERROR");
                break;
            }
        }
    }


    /! AJAX !/

    /* URL DE PERSONAJES DE HARRY POTTER */
    const URLGET = "http://hp-api.herokuapp.com/api/characters"
    const puestos=["","Front End","Jefa de diseño","Back End"]
    console.log(puestos)

    $("#creadores").prepend('<button class="categorias" id="btn1"> Mostrar creadores </button>');
    $("#btn1").click(() => { 
    
    $.get(URLGET, function (respuesta, estado) {
          if(estado === "success"){
            let misDatos = respuesta;
            let creadores = misDatos.slice(0,3)
            let i=0;
            for (const dato of creadores) {
                i=i+1
                console.log(puestos[i])
                $("#creadores").prepend(`
                <div class="col-md-4 col-xs-4" id="aniCrea">
                    <img class="fotoCreadores" src=${dato.image}>
                    <h3 class="infoCreadores">${dato.name}</h3>
                    <p class="infoCreadores">${puestos[i]}</p>
                </div>`
            );
            
            }  
            }
            $("#creadores").prepend(`<h3 class="infoCreadores">Nuestros Creadores</h3> `) 
            $("#btn1").hide(2000);
            $("#creadores")
            .hide(1)
            .slideDown(2000)
    })
    
})
