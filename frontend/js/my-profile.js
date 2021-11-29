//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let profile_info = JSON.parse(localStorage.getItem('Login'))//DESAFIATE 6
    let name = document.getElementById('h6name');
    let age = document.getElementById('h6age');
    let email = document.getElementById('h6email');
    let phone = document.getElementById('h6phone');
    let img = document.getElementById('imgProfile');
    let update_profile = document.getElementById('update_profile')
    let main_card = document.getElementById('main_card')
    let edit_card = document.getElementById('edit_card')
    let edit_name = document.getElementById('name')
    let edit_age = document.getElementById('age')
    let edit_email = document.getElementById('email')
    let edit_phone = document.getElementById('phone')

    name.innerHTML = profile_info.name;
    if (age == undefined || age == 0 || age == null) {
        age.innerHTML = 0;
    } else {
        age.innerHTML = profile_info.age;
    }
    email.innerHTML = profile_info.email;
    phone.innerHTML = profile_info.phone;
    img.setAttribute("src", profile_info.image); //DESAFIATE 6

    //DESAFIATE 6 - INICIO
    //Almacenamiento de la imagen en el local storage

    let imgCanvas = document.createElement("canvas");
    let imgContext = imgCanvas.getContext("2d");

    //Igualo ancho y altura
    imgCanvas.width = img.width;
    imgCanvas.height = img.height;

    imgContext.drawImage(img, 0, 0, img.width, img.height);

    // Obtengo contenido canvas como HTML
    let imgAsDataURL = imgCanvas.toDataURL("image/png");

    //Guardo imagen en local storage
    try {
        localStorage.setItem("imgProfile", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }

    //sustituyo el contenido por la imagen almacenada en el localstorage
    document.getElementById("imgProfile").innerHTML = `<center> <img class="user-profile" src=${localStorage.getItem("imgProfile")} alt="User icon" border="0"></center>`

    //DESAFIATE 6 - FIN



    update_profile.addEventListener('click', () => {
        console.log(profile_info)
        edit_name.setAttribute("value", profile_info.name);
        edit_age.setAttribute("value", profile_info.age);
        edit_email.setAttribute("value", profile_info.email);
        edit_phone.setAttribute("value", profile_info.phone);

        update_profile.style.display = "none"
        main_card.style.display = "none"
        edit_card.style.display = "block"
        let form_update = document.getElementById('form_update')
        form_update.addEventListener('submit', (e) => {
            let profile_localStorage = JSON.parse(localStorage.getItem('Login'))
            let data = new FormData(e.target)
            let profile_object = {
                name: data.get('name'),
                age: data.get('age'),
                email: data.get('email'),
                phone: data.get('phone'),
                image: profile_localStorage.image
            }
            e.preventDefault()
            localStorage.setItem('Login', JSON.stringify(profile_object))
            window.location.href = "my-profile.html"

        })
    })



});