//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const showCart = (productCart) => {
console.log(productCart);

let htmlContentToAppend = "";

    for (let i = 0; i < productCart.articles.length; i++) {
        let articles = productCart.articles[i];

        let cartContent = document.getElementById("cartContent");
        let cartName = document.getElementById("cartName");
        let cartCount = document.getElementById("cartCount");
        let cartUnitCost = document.getElementById("cartUnitCost");
        let cartCurrency = document.getElementById("cartCurrency");
        let cartSrc = document.getElementById("cartSrc");


        console.log("nombre: "+ articles.count);

        cartName.innerHTML = articles.name;
        cartCount.innerHTML = articles.count;
        cartUnitCost.innerHTML = articles.unitCost;
        cartCurrency.innerHTML = articles.currency;
        cartSrc.innerHTML = articles.src;

        htmlContentToAppend += `  
        <li class="list-group-item text-right mx-2">
        <img class="d-block w-100" src="` + articles.src + `" alt="">
        <div class="row">` + articles.name + `</div>
        </li>
        `
        
    document.getElementById("cartContent").innerHTML = htmlContentToAppend;
    }





};



document.addEventListener("DOMContentLoaded", async function(e){

    const productCart = (await getJSONData(CART_INFO_URL)).data;
    
    showCart(productCart);

});