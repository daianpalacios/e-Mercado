//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let profile_info = JSON.parse(localStorage.getItem('Login'))
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

    console.log(profile_info)
    name.innerHTML = profile_info.name;
    if (age == undefined || age == 0 || age == null) {
        age.innerHTML = 0;
    } else {
        age.innerHTML = profile_info.age;
    }
    email.innerHTML = profile_info.email;
    phone.innerHTML = profile_info.phone;
    img.setAttribute("src", profile_info.image);




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