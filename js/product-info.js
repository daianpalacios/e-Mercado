//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//CODIGO DE CATEGORYYY
var productos = {};

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

//FIIINN   CODIGO DE CATEGORYYY


document.addEventListener("DOMContentLoaded", function (e) {


    // codigo category
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

    //FINN CODIGOO CATEGORYY
});



