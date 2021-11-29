

// const CATEGORIES_URL = "http://localhost:3000/category/all.json";
// const PUBLISH_PRODUCT_URL = "http://localhost:3000/product/publish.json";
// const CATEGORY_INFO_URL = "http://localhost:3000/category/1234.json";
// const PRODUCTS_URL = "http://localhost:3000/product/all.json";
// const PRODUCT_INFO_URL = "http://localhost:3000/product/5678.json";
// const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product/5678-comments.json";
// const CART_INFO_URL = "http://localhost:3000/cart/654.json";
// const CART_BUY_URL = "http://localhost:3000/cart/buy.json";


const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  // let profile_storage = localStorage.getItem('Login');
  // let loginGoogleok = Boolean(localStorage.getItem('google_user') && localStorage.getItem('google_mail')); //¿Se inició sesión con Google?

  
  // if(profile_storage == null || profile_storage == "" || profile_storage == false || profile_storage == undefined  || !(loginGoogleok)){ 
  //   window.location = "login.html";
  // }else if(profile_storage != "entrando"){
  //   const MostUsu = document.getElementById("MostrarUsuario");

  //   profile_storage = JSON.parse(localStorage.getItem('Login'));
  //   MostUsu.innerHTML = "Usuario: " + profile_storage.name; // muestra el usuario en pantalla 
        
  //  }

});
