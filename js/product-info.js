//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var productos = {};
var comentarios = {};

function showImagesGallery(arrayprod) {

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
    let contenidoHTML = "";

    for (let pos = 0; pos < array.length; pos++) {
        let comentario = array[pos];

        contenidoHTML += `
            <div class="row list-group-item list-group-item-action">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">`

        for (let i = 1; i <= 5; i++) {
            contenidoHTML += `<h4 class="mb-1">` + comentario.score + `</h4> `
            contenidoHTML += `<span class="fa fa-star"></span>`
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



document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            let productoNombre = document.getElementById("ProdName");
            let productoDescrip = document.getElementById("ProdDescription");
            let productoCosto = document.getElementById("ProdCosto");
            let productoMoneda = document.getElementById("ProdMoneda");
            let productosoldCount = document.getElementById("ProdSoldCount");
            let productoCategoria = document.getElementById("ProdCategoria");
            let productoRela = document.getElementById("ProdRela");

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



