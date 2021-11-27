    /* No esta registrado */
    let uRegistrado = false;
    

    /* ESCONDE EL BOTON COMPRAR */
    $("#comprar").hide()
    
   



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
        if (uRegistrado==true){
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
                <td class=""> ID=${productoNuevo.id}</td>
                <td class="elementoTablas"><img class="compras" src=${productoNuevo.imgs}></td>
                <td class="elementoTablas">${productoNuevo.prod}</td>
                <td class="elementoTablas"><b id=${productoNuevo.precio}>$ ${productoNuevo.precio}</b></td>
                <td class="elementoTablas"><input type="number" value=1 id="${productoNuevo.prod}"></input></td>
                <td class="elementoTablas"><button onclick=eliminar(${JSON.stringify(productoNuevo.id)})>x</button></td>
            <tr>`);
                $(tabla).append(tablaBody)
                $("#carro").append(tabla)
                precioCuotas=precioCuotas+productoNuevo.precio
                total.innerHTML= `Total: $${precioCuotas}`;
                posicion = carrito.findIndex(p => p.id == productoNuevo.id);
                /! ANIMACIONES CONCATENADAS!/
                $("#comprar").show(2000)
                
            } else {
                console.log(carrito)
                posicion = carrito.findIndex(p => p.id == productoNuevo.id);
                cantidad = carrito[posicion].cantidad += 1;
                precioCuotas=precioCuotas+productoNuevo.precio;
                total.innerHTML= `Total: $${precioCuotas}`;
                document.getElementById(productoNuevo.prod).value = cantidad;
                let precio= document.getElementById(productoNuevo.precio);
                precio.innerText=`$${productoNuevo.precio*cantidad}`;
            }
            localStorage.setItem("cart",JSON.stringify(carrito))
    }
    else if (uRegistrado==false){
        swal.fire({
    
            icon: 'error',
            title: 'Debe registrarse como usuario',
    
        });
        
    }
} 
    
/* ELIMINAR */

function eliminar(eliminado){
    localStorage.removeItem("cart")
    let hola=document.getElementById(eliminado);
    tablaBody.removeChild(hola);
    posicion = carrito.findIndex(p => p.id == eliminado);
    cantidad = carrito[posicion].cantidad = 1;
    carrito.splice(posicion,1);
    /* Falta restar el precio eliminado */
    precioCuotas=(precioCuotas-eliminado);
    console.log(precioCuotas);
    total.innerHTML= `Total: $${precioCuotas}`;
    localStorage.setItem("cart",JSON.stringify(carrito))

}   


    /* Vaciar carrito */
    function vaciarCarrito(){
        let tabla=document.getElementById("tabla");
        tabla.parentNode.removeChild(tabla);
        total.innerHTML= `Total: $ `;
        carrito=[];
        console.log(carrito);
        localStorage.clear();
        tabla.innerHTML=` `;
        tablaBody.innerHTML=` `;
        precioCuotas=0
        $("#comprar").hide(2000)
       
        
    }

    /* BOTON DE COMPRAR / CON JQUERY */

    $("#comprar").click( function ()
    {      
        $("#formulario").html(``);
        $("#formulario").show(1000)
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
        `);


        $("#miForm").submit(function(e){
            e.preventDefault();
            /* VALIDAR LOS INPUT TEXT */
            let nom=$("#nombre").val();
            let ape=$("#apellido").val();
            let direccion=$("#direccion").val();
            let mail=$("#gmail").val();
            let nro=$("#nro").val();
            
            /* VALIDACION SI ESTAN VACIOS LOS INPUTS */
            if ((nom === "") || (ape === "") || (mail === "") || (direccion === "") || (nro === "")) {
                $("#faltantes").append("Rellene los campos faltantes");
            }else{
                console.log(nom,ape,direccion,mail,nro)
                Swal.fire(
                    $("#nombre").val(),
                    '¡Tu pedido esta en camino!',
                    'success',
                );
                generarCompra()
                vaciarCarrito()
                $("#formulario").hide(1000);
                carrito=[];
                console.log(carrito)
             
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
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas2").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas3").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas3").val(); 
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas4").is(':checked')){ 
                    $("#totalCuotas").html(' ');
                    let cantCuotas = $("#cuotas4").val();
                    $("#totalCuotas").append("El monto a abonar son $"+(precioCuotas/cantCuotas) + "Y Las cuotas son de $"+((precioCuotas/cantCuotas)/100*15+(precioCuotas/cantCuotas)))
                } else if ($("#cuotas5").is(':checked')){ 
                    $("#totalCuotas").html(' ');
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


    /* SIRVE PARA GRAFICAR EN EL CAMION */
    let cantCompras=0;
    let finalCamion=0;

 function generarCompra (){
    let ultimaCompra;
    /* GENERA UN NUMERO RANDOM PARA EL NUMEROD DE COMPRA */
    let nRandom= Math.floor(Math.random()*1000000)
       

    for (let i=0; i<localStorage.length;i++){
        let clave=localStorage.key(i);
        console.log("Clave: "+clave);
        let valor = (localStorage.getItem(clave));
        ultimaCompra= (JSON.parse(valor));
        cantCompras=cantCompras+1;
        
        /* SE GRAFICA EL MENU DESPLEGABLE */
        $("#camionCompra").append(`
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 muestraCamion">
                <li class="nav-item dropdown">
                <a class=" desplegableCamion " href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Numero de compra: ${nRandom} 
                </a>
                <ul id="tablaCamion${nRandom}" class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                </ul>
                </li>
            </ul>
            `
            );


            /* ACA SE AGREGAN LOS PRODS AL MENU */
        for (const prodFinal of ultimaCompra){
            finalCamion=finalCamion+prodFinal.precio
            $("#tablaCamion"+nRandom).append(` 
            <li class="elementoCamion">
                <tr class="elementoCamion" id="tablaFinalCamion">
                    <td class="elementoCamion"> <img class="imgCamion" src=${JSON.stringify(prodFinal.imgs)}></td>
                    <td class="elementoCamion"><p>${prodFinal.prod}</p></td>
                    <td class="elementoCamion"><b id=${prodFinal.precio}>$ ${prodFinal.precio}</b></td>

                </tr>
            </li>`);
        };
        
    };
};


/! AJAX !/

/* URL DE PERSONAJES DE HARRY POTTER */
const URLGET = "http://hp-api.herokuapp.com/api/characters";
const puestos=["","Front End","Jefa de diseño","Back End"];
console.log(puestos);

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
        
        }; 
        };
        $("#creadores").prepend(`<h3 class="infoCreadores">Nuestros Creadores</h3> `);
        $("#btn1").hide(2000);
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
let usuarios=[];


$("#usuarioBoton").click(function(){
    $("#usuario").append(`
        <ul class="usuario" id="ulDesplegable" aria-labelledby="offcanvasNavbarDropdown">
        <li class="desplegableUsuario">
        <form id ="formularioUsuario" action="">
            <label class="labelUsuario">Correo Electronico
                <input type="text" placeholder="correo..." class="inputUsuario" name ="iniciar" id="iniciar"></input>
            </label>
            <label class="labelUsuario">Contraseña
                <input type="text" placeholder="contraseña..." class="inputUsuario" name ="iniciar" id="iniciar"></input>
            </label>
            <button id="registrarse"> No tengo cuenta </button>
        </form>
        </li>
        </ul>`
    )
    
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
                <button  type="submit" id="registro"> Registrarse </button>
                <button type="reset" >Limpiar </button>
    
            `);
            
        
            
            
            const inputsSelec = document.querySelectorAll("#formularioUsuario input");
    
            /* Funcion que toma los inputs */
            inputsSelec.forEach((input) => {
                input.addEventListener("keyup", validarForm);
            });
    
            const form = document.getElementById("formularioUsuario");
            /* Funcion que toma el boton de envio */
    
            /* USUARIO REGISTRADO? */
    
            
    
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
                    console.log(usuarios);
                    localStorage.setItem("usuario",JSON.stringify(usuarios));
    
                    $("#ulDesplegable").hide(2000);
                    
                    uRegistrado=true;
    
                    /* resetea el form */
                    form.reset();
    
    
                }else{
                    
                    swal.fire({
    
                        icon: 'error',
                        title: 'Rellene los campos faltantes',
    
                    });
                
                };
        });
    
    })

   

});

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
                console.log("Estoy vacio")
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
        console.log("Estoy vacio")
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





