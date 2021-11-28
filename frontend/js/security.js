document.addEventListener("DOMContentLoaded", function(e){

  let profile_storage = JSON.parse(localStorage.getItem('Login'))
  if(profile_storage == null || profile_storage == "" || profile_storage == false || profile_storage == undefined ){ 
    window.location = "login.html";
  }else if(profile_storage != "entrando"){
    const MostUsu = document.getElementById("MostrarUsuario");   
  }


  });