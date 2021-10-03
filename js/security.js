document.addEventListener("DOMContentLoaded", function(e){
    let getlocal = localStorage.getItem("Login");
    if(getlocal == null || getlocal == "" || getlocal == false || getlocal == undefined || getlocal=="entrando"  ){ 
      window.location = "login.html";
    }else if(getlocal != "entrando"){
      const MostUsu = document.getElementById("MostrarUsuario");
          
     }
  });