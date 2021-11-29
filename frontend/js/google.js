//DESAFIATE 1

function renderButton() { //Crea un botón de inicio de sesión de Google con configuraciones personalizadas.
    gapi.signin2.render('gSignIn', {
        'width': 300,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function onSuccess(googleUser) { //Función de devolución de llamada una vez que se inicia sesión,
                                //Obtiene los datos de la cuenta y los muestra en pantalla
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            localStorage.setItem('google_user',  resp.name);  //Almaceno como datos de sesión el nombre y email
            localStorage.setItem('google_mail', resp.email); 
            let profile_info= {
                name: resp.name,
                age: '0',
                email: resp.email,
                phone: '',
                image: 'https://i.ibb.co/YPbhWXZ/user.png' //DESAFIATE 6
            }
           localStorage.setItem("Login", JSON.stringify(profile_info));           
            window.location = "index.html";
            document.getElementById("gSignIn").style.display = "none";
        });
    });
}

//Función llamada en el ingreso cuando no se logra iniciar correctamente
function onFailure(error) {
    alert("Hubo un error, intente nuevamente.\n");
}

//Cierra la sesión del usuario en la cuenta de Google.
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById("gSignIn").style.display = "block";
       localStorage.clear();
    });

    auth2.disconnect();
}