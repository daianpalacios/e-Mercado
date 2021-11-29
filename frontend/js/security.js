document.addEventListener("DOMContentLoaded", function(e){

  let profile_storage = JSON.parse(localStorage.getItem('Login'))
  let loginGoogleok = Boolean(localStorage.getItem('google_user') && localStorage.getItem('google_mail')); //¿Se inició sesión con Google?

  if(profile_storage == null && profile_storage == "" && profile_storage == false && profile_storage == undefined && !(loginGoogleok)){ 
    window.location = "login.html";
  }else if(profile_storage != "entrando"){
    const MostUsu = document.getElementById("MostrarUsuario");   
    MostUsu.innerHTML = "Usuario: " + profile_storage.name; // muestra el usuario en pantalla 
  }


  });