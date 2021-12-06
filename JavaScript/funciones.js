    /* No esta registrado */
    let uRegistrado = false;
    

    /* ESCONDE EL BOTON COMPRAR */
    $("#comprar").hide()
    $("#borrar").hide()
   
    /* BOTON PARA IR A LA SECCION CARRO */
    $('#irACarro').click( function(e) { 
        e.preventDefault();
        //Animamos sus propiedades CSS con animate
        $('html, body').animate({
            scrollTop: $("#carro").offset().top  
        });
    } );


    /* tabla con DOM */
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

/* BUSCADOR */
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


let totalCompra=0
/* Agregar al carrito */
function calcular(){
    

    for (const precio of carrito){
        console.log(precio.precio)
        console.log(precio.cantidad)

        precioEliminado=precio.precio*precio.cantidad
        
        totalCompra=totalCompra+precioEliminado

        console.log(precioEliminado)
    }
    total.innerHTML= `Total: $${totalCompra}`;

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
        if ((uRegistrado==true) || (uRegistrado=="repetido")){
        let encontrado = carrito.find(prod => prod.id == productoNuevo.id);
            if (encontrado == undefined) {
                let productoAAgregar = new productoCarrito(productoNuevo);
                carrito.push(productoAAgregar);
                Swal.fire({
                    icon: 'success',
                    title: 'Nuevo producto agregado al carro',
                    text: productoNuevo.prod,
                    showConfirmButton: false,
                    timer: 1500
                })
            
                $(tablaBody).append(`
                <tr id=${JSON.stringify(productoNuevo.id)}>
                    <td class="elementoTablas"><img class="compras" src=${productoNuevo.imgs}></td>
                    <td class="elementoTablas">${productoNuevo.prod}</td>
                    <td class="elementoTablas"><b id=${productoNuevo.precio}>$${productoNuevo.precio}</b></td>
                    <td class="elementoTablas"><input type="text" class="inputCelu" value=1 id="${productoNuevo.prod}"></input></td>
                    <td class="elementoTablas"><button onclick=eliminar(${JSON.stringify(productoNuevo.id)})>x</button></td>
                <tr>`);
                    $(tabla).append(tablaBody)
                    $("#carro").append(tabla)
                    totalCompra=0

                    calcular()
                    posicion = carrito.findIndex(p => p.id == productoNuevo.id);
                    /! ANIMACIONES CONCATENADAS!/
                    $("#comprar").show(2000)
                    $("#borrar").show(2000)
                    $(".muestraCamion").hide(1000)
                    $("#tabla").show(1000)
                    document.getElementById("divCamion").classList.add("divBotonNo");
                    document.getElementById("divCamion").classList.remove("divBoton");
                    document.getElementById("divProds").classList.remove("divBotonNo");
                    document.getElementById("divProds").classList.add("divBoton");
            } else {
                posicion = carrito.findIndex(p => p.id == productoNuevo.id);
                cantidad = carrito[posicion].cantidad += 1;
                totalCompra=0
                calcular()
                document.getElementById(productoNuevo.prod).value = cantidad;
                let precio= document.getElementById(productoNuevo.precio);
                precio.innerText=`$${productoNuevo.precio*cantidad}`;
            }
            localStorage.setItem("cart",JSON.stringify(carrito))
    }else if ((uRegistrado==false) || (uRegistrado=="repetido")) {
        swal.fire({
    
            icon: 'error',
            title: 'Debe iniciar sesion!',
    
        });
        
    }
} 
    
/* ELIMINAR */
let montoCarro=0
    function eliminar(eliminado){
        let precioEliminado;
        
        
        console.log(precioEliminado)
        console.log(montoCarro)
        localStorage.removeItem("cart")
        let hola=document.getElementById(eliminado);
        tablaBody.removeChild(hola);
        posicion = carrito.findIndex(p => p.id == eliminado);
        cantidad = carrito[posicion].cantidad = 1;
        carrito.splice(posicion,1);
        calcular()
        localStorage.setItem("cart",JSON.stringify(carrito))

    }   


    /* Vaciar carrito */
    function vaciarCarrito(){
        let tabla=document.getElementById("tabla");
        tabla.parentNode.removeChild(tabla);
        total.innerHTML= `Total: $ `;
        carrito=[];
        console.log(carrito);
        localStorage.removeItem("cart");
        tabla.innerHTML=` `;
        tablaBody.innerHTML=` `;
        precioCuotas=0
        $("#comprar").hide(2000)
        $("#borrar").hide(2000)

        
    }

    /* BOTON DE COMPRAR / CON JQUERY */
    /* La defino como global */
    let ultimaCompra;

    
    let comprasFinales;
    
    class compraParaLocal {
        constructor(compra) {
            this.id = compra.id;
            this.imgs = compra.imgs;
            this.prod = compra.prod;
            this.precio = compra.precio;
            this.categorias = compra.categorias;
            this.cantidad = compra.cantidad;
             
        };
    };
    let usuarioBorrado;
    let comprasEnLocal;
    let valor;
    $("#comprar").click( function (){      
        $("#formulario").html(``);
        $("#formulario").show(1000)
        $("#formulario").attr("class","col-md-12 col-xs-12 borde")
        $("#formulario").append(`
            <form id="miForm">
                <div class="col-md-12 col-xs-12">
                <h4>Seleccione su plan de pago</h4>
                    <label class="label2">
                        
                        <input type="radio" value="1" class="cuotas" name="cuotas" id="cuotas1">Pago Total </p></input>
                      
                        <input type="radio" value="3" class="cuotas" name="cuotas" id="cuotas2">3 Cuotas sin interes </p></input>
                    
                        <input type="radio" value="6" class="cuotas" name="cuotas" id="cuotas3">6 Cuotas </p></input>
                       
                        <input type="radio" value="9" class="cuotas" name="cuotas" id="cuotas4">9 Cuotas </p></input>
                     
                        <input type="radio" value="12" class="cuotas" name="cuotas" id="cuotas5">12 Cuotas </p></input>
                    </label>
                    <p id="totalCuotas" class="totalCuotas"></p>
                </div>
                    <br>
                <label class="label3"> 
                    <button class="botonesForm" id="enviar" type="submit">Enviar </button>
                </label>
            </form>
        `);
        comprasEnLocal=JSON.parse(localStorage.getItem(usuario)) || [];
        let compraDELstorage=localStorage.getItem("cart")
        let JSONcompraDELstorage= JSON.parse(compraDELstorage)
        comprasEnLocal.push(JSONcompraDELstorage)
        localStorage.setItem(usuario,JSON.stringify(comprasEnLocal))

       
       
        
        /* seteo la compra para que quede guardada en el local storage */
        
        
        $("#miForm").submit(function(e){
            e.preventDefault();
            /* VALIDACION SI ESTAN VACIOS LOS INPUTS */
                Swal.fire(
                    $("#nombre").val(),
                    '¡Tu pedido esta en camino!',
                    'success',
                );
                vaciarCarrito()
                $("#formulario").hide(1000);
                carrito=[];
                let camionesCargados=localStorage.getItem(usuario)
                let JSONcamionesCargados=JSON.parse(camionesCargados)
                comprasEnLocal.push=JSONcamionesCargados
                    
                
        })
        
        /* FALTA RETOCAR ALGUNAS COSAS */
        $(document).ready(function(){  
            $("#enviar").hide()
            $(".cuotas").click(function() {
                if($("#cuotas1").is(':checked')) {  
                    $("#totalCuotas").html(' ')
                    let cantCuotas = $("#cuotas1").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(totalCompra))                    
                    $("#enviar").show(1000)
                } else if ($("#cuotas2").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas2").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(totalCompra) + " Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                    $("#enviar").show(1000)
                } else if ($("#cuotas3").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas3").val(); 
                    $("#totalCuotas").append("El monto a abonar son $"+(totalCompra) + " Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                    $("#enviar").show(1000)
                } else if ($("#cuotas4").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas4").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(totalCompra) + " Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                    $("#enviar").show(1000)
                } else if ($("#cuotas5").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas5").val();  
                    $("#totalCuotas").append("El monto a abonar son $"+(totalCompra) + " Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                    $("#enviar").show(1000)              
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


    /* SIRVE PARA GRAFICAR EN EL CAMION */
    
    let finalCamion=0;
    let compra;
    function generarCompraEnLocal (){
        /* GENERA UN NUMERO RANDOM PARA EL NUMEROD DE COMPRA */
        comprasEnLocal=JSON.parse(localStorage.getItem(usuario)) || [];
        
        $(".muestraCamion").remove()
        
            if (compra===null){
                compra = localStorage.getItem(usuario)
            }

            ultimaCompra= (JSON.parse(compra));
            /* SE GRAFICA EL MENU DESPLEGABLE */            

            /* ACA SE AGREGAN LOS PRODS AL MENU */
            let i=0
        for (const compra of comprasEnLocal){
            let nRandom= Math.floor(Math.random()*1000000)

            $("#carro").append(`
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 muestraCamion" id="${usuario+i}">
                    <li class="nav-item dropdown">
                    <a class=" desplegableCamion " href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Compra Numero: ${(i+1)} 
                    </a>
                    <ul id="tablaCamion${nRandom}" class="dropdown-menu compraDesplegable" aria-labelledby="offcanvasNavbarDropdown">
                    </ul>
                    <button onclick="borrarCompra(${(usuario+i)})">x</button>

                    </li>
                </ul>
                `
                );
                $("#tablaCamion"+nRandom).append(`
                <li class="elementoCamion" >
                    <tr class="elementoCamion">                   
                        <td class="elementoCamion"><p class="prodsCompra">Img</p></td>
                        <td class="elementoCamion"><p class="prodsCompra">Productos</p></td>
                        <td class="elementoCamion"><b class="prodsCompra">Precio</b></td>
                        <td class="elementoCamion"><b class="prodsCompra">Cantidad</b></td>
                    </tr>
                </li>`)
            $(".muestraCamion").hide()

                for (const prodFinal of comprasEnLocal[i]){
                    finalCamion=finalCamion+(prodFinal.precio*prodFinal.cantidad)
                    
                    $("#tablaCamion"+nRandom).append(` 
                    <li class="elementoCamion" >
                        <tr class="elementoCamion" id="tablaFinalCamion">
                            <td class="elementoCamion"> <img class="imgCamion prodsCompra" src=${JSON.stringify(prodFinal.imgs)}></td>
                            <td class="elementoCamion"><p class="prodsCompra">${prodFinal.prod}</p></td>
                            <td class="elementoCamion"><b class="prodsCompra" id=${prodFinal.precio}>$${prodFinal.precio}</b></td>
                            <td class="elementoCamion"><b class="prodsCompra">${prodFinal.cantidad}</b></td>
                        </tr>
                    </li>`);
                };
                $("#tablaCamion"+nRandom).append(`                        
                    <td class="elementoCamion"><b>$ Total:${finalCamion}</b></td>
                `)
                finalCamion=0
                i=i+1
        }    
    };  
    /* Defino z para poder agregar mas productos con id de pedido con numero */
   /* CAMBIAR EL IF PARA QUE OBTENGA LA KEY DEL LOCAL STORAGE Y ASI COMPARARLA CON LA QUE INGRESA.. */
    function borrarCompra(compraBorrada){
        let i=0
        let borrado
        /* HACER SPLICE AL CARRITO PARA QUE SE ELIMINE ESE PRODUCTO */
        $("#carro").children().each(function(e){
            console.log(i)
            let camion=$("#carro").children()
            console.log(e)
            console.log(i)
            console.log(compraBorrada)
            console.log(comprasEnLocal)

            if (camion[i]===compraBorrada){
                

                $(compraBorrada).remove()
                borrado = i
                
            }
            i=i+1
        })

        comprasEnLocal.splice(borrado,1)
        localStorage.setItem(usuario,JSON.stringify(comprasEnLocal))
        generarCompraEnLocal()
            
    }
   

/* MOSTRAR COMPRAS EN SECCION CARRITO*/
$("#camion").click(function(){
    if (uRegistrado==true){
        generarCompraEnLocal()
        $(".muestraCamion").show(1000)
        $("#tabla").hide(1000)
        document.getElementById("divProds").classList.add("divBotonNo");
        document.getElementById("divProds").classList.remove("divBoton");
        document.getElementById("divCamion").classList.remove("divBotonNo");
        document.getElementById("divCamion").classList.add("divBoton");
        
    }else if ((uRegistrado==false) || (uRegistrado=="repetido") || (uRegistrado=="registrado")) {
        swal.fire({
    
            icon: 'error',
            title: 'Debe iniciar sesion para ver sus compras!',
    
        });
        
    }
    
})

/* MOSTRAR PRODUCTOS EN SECCION CARRITO */
$("#mostrarProductos").click(function(){
    $(".muestraCamion").hide(1000)
    $("#tabla").show(1000)
    document.getElementById("divCamion").classList.add("divBotonNo");
    document.getElementById("divCamion").classList.remove("divBoton");
    document.getElementById("divProds").classList.remove("divBotonNo");
    document.getElementById("divProds").classList.add("divBoton");
    
})



/* AJAX */

/* URL DE PERSONAJES DE HARRY POTTER */
const URLGET = "http://hp-api.herokuapp.com/api/characters";
const puestos=["","Front End","Jefa de diseño","Back End"];
console.log(puestos);

$("#creadores").prepend('<button class="categorias" id="btn1"> Mostrar creadores </button>');
$("#btn1").click(() => { 

        $("#creadores").addClass("creadores");
        $("#btn1").hide(1);
    
        $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){
                let misDatos = respuesta;
                let creadores = misDatos.slice(0,3)
                let i=0;
                for (const dato of creadores) {
                    i=i+1
                    $("#creadores").prepend(`
                    <div class="col-md-4 col-xs-4" id="aniCrea">
                        <img class="fotoCreadores" src=${dato.image}>
                        <h3 class="infoCreadores">${dato.name}</h3>
                        <p class="infoCreadores">${puestos[i]}</p>
                    </div>`
                );
                
                }; 
                };
        
                $("#creadores").prepend(`<h3 class="infoCreadores">Creadores y Equipo de Trabajo</h3> `);
                $("#creadores")
                .hide(1)
                .slideDown(2000);
        });
    
    });




/* SECCION USUARIO */

const inputs = ["nombreApellido","nombreUsuario","gmail","direccion","clave","claveVerificada"];
const labels =  ["Nombre y apellido","Usuario", "Correo","direccion", "Contraseña", "Reescriba su contraseña"];
const places = ["Nombre completo","Ingrese un nombre de usuario","Ingrese su correo","direccion","Contraseña","Reescriba su contraseña"];
/* ACA VAN A IR LOS NUEVOS USUARIOS */
let usuarioRegistrado = localStorage.getItem("usuario");
let usuarioRegistradoJSON= JSON.parse(usuarioRegistrado);
let usuarios=[];
if (usuarioRegistrado === null){
    console.log("no hay usuarios")
}else{
    usuarios=usuarioRegistradoJSON;
}


/* TOMA EL NOMBRE DE USUARIO */
let nombreUsuario;
let usuario;
$("#usuarioBoton").click(function(){
  
    if (uRegistrado ===false){
        $("#ulDesplegable").html('');
        $("#usuario").append(`
            <ul class=" navbar-nav justify-content-end flex-grow-1 pe-3 usuario" id="ulDesplegable" aria-labelledby="offcanvasNavbarDropdown" style="display: none;">
            <li class="nav-item dropdown desplegableUsuario">
            <form id ="formularioUsuario" action="">
                <label class="labelUsuario">Correo Electronico
                    <input type="text" placeholder="correo..." class="inputUsuario" name ="gmail" id="gmail"></input>
                </label>
                <label class="labelUsuario">Contraseña
                    <input type="text" placeholder="contraseña..." class="inputUsuario" name ="clave" id="clave"></input>
                </label>
                <button class="botonesUsuario" id="registrarse"> No tengo cuenta </button>
                <button class="botonesUsuario" id="submit" id="iniciar"> iniciar </button>
            </form>
            </li>
            </ul>`
        )
        iniciar()
        
    } else if(uRegistrado ==="repetido"){

        $("#ulDesplegable").html(``);
        $("#ulDesplegable").append(`
            <li class="desplegableUsuario">
                <form id ="formularioUsuario" action="">
                    <label class="labelUsuario">Correo Electronico
                        <input type="text" placeholder="correo..." class="inputUsuario" name ="gmail" id="gmail"></input>
                    </label>
                    <label class="labelUsuario">Contraseña
                        <input type="text" placeholder="contraseña..." class="inputUsuario" name ="clave" id="clave"></input>
                    </label>
                    <button id="registrarse" class="botonesUsuario"> No tengo cuenta </button>
                    <button type="submit" id="iniciar" class="botonesUsuario"> iniciar </button>
                </form>
            </li>
        `)
        iniciar()
        
    }else if(uRegistrado ===true){
        $("#formularioUsuario").html(' ');
        $("#formularioUsuario").append(`
            <p>Hola ${nombreUsuario}!</p>
            <a type="button" id="datos">Datos de la cuenta</a>
            <a type="button" id="cerrar">Cerrar sesion</a>
        `)
        
        
        

        $("#cerrar").click(function(){
            uRegistrado="repetido"
            $("#ulDesplegable").hide(1000);
            l=0
            $("#carro").html(``)
            $(".muestraCamion").remove()
            
        })
    }

    /* FUNCION DE REGISTRO */
        $("#registrarse").click(function(){
            let i=0;
            $("#formularioUsuario").html(``);
            for(const inputsNames of inputs){ 
                    
                $("#formularioUsuario").append(`
                <label for="" id="labelUsuario" class="labelUsuario">
                    ${labels[i]}           
                    <input type="text"  placeholder=${places[i]} class="inputUsuario" name = ${inputsNames} id="${inputsNames}"></input>

                </label>`)
                i = i+1;
            }
            $("#formularioUsuario").append(`
                <button class="botonesUsuario" id= type="reset" >Limpiar </button>
                <button  class="botonesUsuario" id= type="submit" id="registro"> Registrarse </button>
                <button class="botonesUsuario" id= id="sesion"> Si tengo cuenta </button>

            `);
            
            comprobar()
        });
        uRegistrado="registrado"
        
        $("#ulDesplegable").fadeToggle(1000);
    
});





/* FUNCION PARA INICIAR SESION */
function iniciar(){
        const inputsSelec = document.querySelectorAll("#formularioUsuario input");
            
            /* Funcion que toma los inputs */
            inputsSelec.forEach((input) => {
                input.addEventListener("keyup", validarForm);
            });
            
            const form = document.getElementById("formularioUsuario");
            /* Funcion que toma el boton de envio */
                    
            form.addEventListener("submit",(e)=>{
            e.preventDefault();
            let usuarioRegistrado = localStorage.getItem("usuario")
            let usuarioRegistradoJSON= JSON.parse(usuarioRegistrado)
            /* TOMA DE VALORES */
            let valorCorreo;
            let valorContra;
            /* Agarro el valor que se ingresa */
            valorContra=$("#clave").val()
            valorCorreo=$("#gmail").val()
            let correoDeRegistro;
            let contraDeRegistro;
            
            /* PRUEBA PARA VERIFICAR USUARIOS */
            if (usuarioRegistradoJSON === null){
                /* NO EXISTE ESTE USUARIO */
                swal.fire({                
                    icon: 'error',
                    title: 'Este usuario no existe',
                    text: 'Registrate'
                });
            } else{
                for (const user of usuarioRegistradoJSON){
                    correoDeRegistro=user.correo
                    contraDeRegistro=user.contra1
                    /* Toma de nombre de usuario para el menu usuario */
                    nombreUsuario=user.nombreCompleto
                    usuario=user.nombreDeUsuario
                    if ((valorCorreo === correoDeRegistro) && (valorContra === contraDeRegistro )){


                        
                            compra = localStorage.getItem(usuario)

                            if(compra == null){
                                console.log("NO HAY NADA")
                            }else{
                                generarCompraEnLocal()
                            }
                        
                        uRegistrado=true;
                        swal.fire({
                            icon: 'success',
                            title: 'Has iniciado sesion con exito!',
                        });
                        $("#ulDesplegable").hide(2000);
                        /* resetea el form */
                        

                        
                        
                        form.reset();
                        break
                    }else{                               
                        swal.fire({                
                            icon: 'error',
                            title: 'Rellene los campos faltantes',
                        });                       
                    }
                }
            }         
        })
}


/* COMPROBACION DE INPUTS */
function comprobar(){
    
    const inputsSelec = document.querySelectorAll("#formularioUsuario input");
        
                /* Funcion que toma los inputs */
                inputsSelec.forEach((input) => {
                    input.addEventListener("keyup", validarForm);
                });
        
                const form = document.getElementById("formularioUsuario");
                /* Funcion que toma el boton de envio */
                
                form.addEventListener("submit",(e)=>{
                    e.preventDefault();
                
                    if ((inputsLlenados.nombreApellido === true ) && (inputsLlenados.nombreUsuario === true ) && (inputsLlenados.gmail === true) && (inputsLlenados.direccion === true ) && (inputsLlenados.clave === true ) && (inputsLlenados.claveVerificada === true )){
                        swal.fire({
                            icon: 'success',
                            title: 'Se a registrado con exito!',
                        });
                        /* Creacion de usuarios */
                        datosUsuario= new user (valorName,valorUser,valorCorreo,valorClave,valorClaveVerificada);
                        usuarios.push(datosUsuario);
                        localStorage.setItem("usuario",JSON.stringify(usuarios));
                        
                        
                        
                        uRegistrado=true;
        
                        /* resetea el form */
                        form.reset();
                        
                            inputsLlenados.nombreApellido = false;
                            inputsLlenados.nombreUsuario = false;
                            inputsLlenados.gmail = false;
                            inputsLlenados.direccion=false;
                            inputsLlenados.clave = false;
                            inputsLlenados.claveVerificada = false;
                       
                        nombreUsuario=valorUser
                        $("#ulDesplegable").hide(2000);
                    }else{
                        
                        swal.fire({
        
                            icon: 'error',
                            title: 'Rellene los campos faltantes',
        
                        });
                    
                    };
        })
}


/* Expresiones */
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	contra: /^.{4,12}$/, // 4 a 12 digitos.
    direccion: /^.{4,30}$/, // 4 a 12 digitos.
	gmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

/* Los inputs estan definidos como false al principio para que no pueda ser enviado el formulario de una */
const inputsLlenados=[
    nombreApellido = false,
    nombreUsuario = false,
    gmail = false,
    direccion=false,
    clave = false,
    claveVerificada = false,
];
class user {
    constructor(nC,nDU,c,d,c1,c2) {
        this.nombreCompleto = nC;
        this.nombreDeUsuario = nDU;
        this.correo = c;
        this.direccion = d;
        this.contra1 = c1;
        
    };
};

let datosUsuario;
let valorName;
let valorUser;
let valorCorreo;
let valorDireccion;
let valorClave;
let valorClaveVerificada;


const validarForm = (e) => {
    
    switch (e.target.name) {
        case "nombreApellido":{

            validar(expresiones.nombre,e,"nombreApellido",nombreApellido);
            valorName =e.target.value;
            break;
        }
        case "nombreUsuario":{
            
            validar(expresiones.usuario,e,"nombreUsuario");
            valorUser =e.target.value;
            break;
        }
        case "gmail":{

            validar(expresiones.gmail,e,"gmail");
            valorCorreo =e.target.value;


            break;
        };
        case "direccion":{
            validar(expresiones.direccion,e,"direccion");
            valorDireccion =e.target.value;

            break;
        };
        case "clave":{
            validar(expresiones.contra,e,"clave");

            break;
        };
        case "claveVerificada":{
            
            const clave1 = document.getElementById("clave");
            const clave2 = document.getElementById("claveVerificada");

            if (clave2.value !== clave1.value ) {

                /* Validacion Incorrecta */
                document.getElementById("claveVerificada").classList.remove("formVacio");
                document.getElementById("claveVerificada").classList.remove("formCorrecto");
                document.getElementById("claveVerificada").classList.add("formMal");
                inputsLlenados.claveVerificada = false;
                    
 
            }else if (clave2.value == " ") {
                /* Validacio Vacia */
                document.getElementById("claveVerificada").classList.remove("formCorrecto");
                document.getElementById("claveVerificada").classList.remove("formMal");
                document.getElementById("claveVerificada").classList.add("formVacio");
                inputsLlenados.claveVerificada = false;
                

            }else if (clave2.value === clave1.value ){

                /* Validacion correcta */
                document.getElementById("claveVerificada").classList.remove("formMal");
                document.getElementById("claveVerificada").classList.remove("formVacio");
                document.getElementById("claveVerificada").classList.add("formCorrecto");
                inputsLlenados.claveVerificada = true;
                valorClave = clave1.value;
                valorClaveVerificada = clave2.value;

   
            };
            

            break
        };
    };
};




/* FUNCION DE VALIDACION */

function validar (expresion,evento,campos){
    if (expresion.test(evento.target.value)){
        /* Validacion correcta */

        document.getElementById(campos).classList.remove("formMal");
        document.getElementById(campos).classList.remove("formVacio");
        document.getElementById(campos).classList.add("formCorrecto");
        inputsLlenados[campos] = true;
       

    }else if (evento.target.value == "") {
        /* Validacio Vacia */
        document.getElementById(campos).classList.remove("formCorrecto");
        document.getElementById(campos).classList.remove("formMal");
        document.getElementById(campos).classList.add("formVacio");
        inputsLlenados[campos]=false;

    } else {
        /* Validacion Incorrecta */
        document.getElementById(campos).classList.remove("formVacio");
        document.getElementById(campos).classList.remove("formCorrecto");
        document.getElementById(campos).classList.add("formMal");
        inputsLlenados[campos]=false;

    };
};





