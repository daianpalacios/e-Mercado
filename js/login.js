//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//const arr = [];
const btnIngreso = () => {
    const IdUsuario = document.getElementById("IdUsuario");
    const IdPass = document.getElementById("IdPass");
    const usuario = IdUsuario.value;
    const pass = IdPass.value;
    if (usuario && pass) {
        // arr.push({
        //     usuario,
        //     pass,
        // });
        let arr=usuario; //Cargo el valor de usuario en el arr para mostrarlo luego en pantalla
        
       localStorage.setItem("Login", arr);
        window.location = "index.html";

    } else {
        alert("Usuario y contraseña no deben ser vacíos");
    }
};

document.addEventListener("DOMContentLoaded", function (e) {
    localStorage.setItem("Login","entrando");
    document.getElementById("btnIngreso").addEventListener("click", btnIngreso);
});