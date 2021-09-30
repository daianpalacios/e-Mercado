//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var productos = {};
var comentarios = {};

function showImagesGallery(arrayprod) { // dibujo como quiero ver las imagenes en pantalla

    let htmlContentToAppend = "";

    for (let i = 0; i < arrayprod.length; i++) {
        let imageSrc = arrayprod[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


function MostrarComentarios(array) {

    function porFecha(x, y) { // Ordena por fecha
        if (x.dateTime < y.dateTime) { return -1; }
        if (x.dateTime > y.dateTime) { return 1; }
        return 0;
    }
    var ArrayOrdenado = array.sort(porFecha).reverse(); // desde el más reciente a el más antiguo

    let contenidoHTML = "";

    for (let pos = 0; pos < ArrayOrdenado.length; pos++) { // dibujo en pantalla con la info del array
        let comentario = ArrayOrdenado[pos];
        console.log(comentario.user + "-" + comentario.dataTime);
        contenidoHTML += `
            <div class="row list-group-item list-group-item-action">
                <div class="col">
                    <div class="col">`

        for (let i = 1; i <= 5; i++) {
            if (i <= comentario.score) {
                contenidoHTML += `<span class="fa fa-star checked"></span>`
            } else {
                contenidoHTML += `<span class="fa fa-star"></span>`
            }
        }

        contenidoHTML += `</div>
                    <p class="mb-1">` + comentario.description + `</p>
                    <p class="mb-1">` + comentario.user + `</p>
                    <small class="text-muted">` + comentario.dateTime + ` </small>

                </div>
            </div>
        `
        document.getElementById("list-comentarios").innerHTML = contenidoHTML;
    }
}


function agregarComentario(comentar, puntaje, descripcion, usuario, fecha) { // agrego comentario nuevo a el array existente
    let contenido = { score: puntaje, description: descripcion, user: usuario, dateTime: fecha }
    comentar.push(contenido);
    console.log(comentar);
    MostrarComentarios(comentar);
}

document.addEventListener("DOMContentLoaded", async function (e) {
    const comentar = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data; 


    document.getElementById("btnComenta").addEventListener("click", () => { // Boton que ingresa nuevo comentario
        let score = "";
        let puntaje = "";
        let description = document.getElementById("coment").value;
        var user = localStorage.getItem("Login");
        n = new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();        
        h = n.getHours();
        min = n.getMinutes();
        s = n.getSeconds();

        //Le doy formato a la fecha 
        let dateTime = y+ "-0" + m + "-" + d +" "+ h +":"+ min +":"+ s;

        score = document.getElementsByName("estrellas"); // obtengo el valor de las estrellas seleccionadas al comentar
        for (var i = 0, length = score.length; i < length; i++) {
            if (score[i].checked) {
                puntaje = score[i].value;
            }
        }
        agregarComentario(comentar, puntaje, description, user, dateTime);

    });


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) { // obtengo la info del producto
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            // creo variables con los datos
            let productoNombre = document.getElementById("ProdName");
            let productoDescrip = document.getElementById("ProdDescription");
            let productoCosto = document.getElementById("ProdCosto");
            let productoMoneda = document.getElementById("ProdMoneda");
            let productosoldCount = document.getElementById("ProdSoldCount");
            let productoCategoria = document.getElementById("ProdCategoria");
            let productoRela = document.getElementById("ProdRela");

            //imprimo en HTML los datos 
            productoNombre.innerHTML = productos.name;
            productoDescrip.innerHTML = productos.description;
            productoCosto.innerHTML = productos.cost;
            productoMoneda.innerHTML = productos.currency;
            productosoldCount.innerHTML = productos.soldCount;
            productoCategoria.innerHTML = productos.category;
            productoRela.innerHTML = productos.relatedProducts;


            //Muestro las imagenes en forma de galería
            showImagesGallery(productos.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;

            MostrarComentarios(comentarios);
        }
    });

});



