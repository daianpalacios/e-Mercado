//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const btnIngreso = () => {
    const IdUsuario = document.getElementById("IdUsuario");
    const IdPass = document.getElementById("IdPass");
    const usuario = IdUsuario.value;
    const pass = IdPass.value;
    if (usuario && pass) {

        let profile_info= {
            name: usuario,
            age: '0',
            email: '',
            phone: '',
            image: 'https://i.ibb.co/YPbhWXZ/user.png' //DESAFIATE 6
        }
        
       localStorage.setItem("Login", JSON.stringify(profile_info));
        window.location = "index.html";

    } else {
        alert("Usuario y contraseña no deben ser vacíos");
    }
};

document.addEventListener("DOMContentLoaded", function (e) {
    localStorage.setItem("Login","entrando");
    document.getElementById("btnIngreso").addEventListener("click", btnIngreso);

});