//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const showList = (productos) => {
    const listDeProduc = document.createElement("ul"); // Contenedor de toda la lista
    // Se recorre el array de productos
    for (let prod of productos) {
        const li = document.createElement("li"); // Item de lista por cada productos
        //prod.productos = [];
        li.appendChild(document.createTextNode(`Name: ${prod.name} `));
        li.appendChild(document.createElement("br"));// genera un enter
        li.appendChild(document.createTextNode(`Description: ${prod.descriptio}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`Cost: ${prod.cost}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`Currency: ${prod.currency}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`ImgScr: ${prod.imgSrc}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`SoldCount: ${prod.soldCount}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        listDeProduc.appendChild(li); // Se añade el item de productos a la lista general
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.appendChild(listDeProduc);// se muestra en pantalla la lista total con el diseño que se le coloco en el div del HTML.

};

document.addEventListener("DOMContentLoaded", async function (e) {
    const productos = (await getJSONData(PRODUCTS_URL)).data;
    console.log(productos);
    showList(productos);
});