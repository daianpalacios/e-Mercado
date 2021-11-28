//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const showList = (productos, minimo, maximo, orden, valorBusca) => {
    const contenedor = document.getElementById("listaProductos");
    var esta = 0;
    valorBusca=valorBusca.toLowerCase(); // pasa a minuscula lo que se va a buscar 
    contenedor.innerHTML = "";

    function SortArray(x, y) { // Ordena costos
        if (x.cost < y.cost) { return -1; }
        if (x.cost > y.cost) { return 1; }
        return 0;
    }

    function SortRelevante(x, y) { // Ordena releavancia
        if (x.soldCount < y.soldCount) { return -1; }
        if (x.soldCount > y.soldCount) { return 1; }
        return 0;
    }

    var ordenar = productos.sort(SortArray);//ordena ascendente segun costo.
    if (orden == "MinOrden") {
        elementos = ordenar;
    } else if (orden == "rele") {
        elementos = productos.sort(SortRelevante).reverse(); // Ordena por relevancia.
    }else {
        elementos = productos.sort(SortArray).reverse(); //ordena decendente segun costo.
        //( ESTA PARTE ME FALTO EN LA ENTREGA 2 POR QUE NO COMPRENDI BIEN LA LETRA EN SU MOMENTO).

    }

    // Se recorre el array de productos
    for (let prod of elementos) {


        var nombre = prod.name.toLowerCase(); // paso el nombre a minuscula
        var descripcion = prod.description.toLowerCase();
        estaEnNom = nombre.search(valorBusca); // busco las letras ingresadas dentro de los nombres
        estaEnDesc = descripcion.search(valorBusca); // busco las letras ingresadas dentro de la descripcion


        if (estaEnNom != -1 || estaEnDesc != -1 || valorBusca == "") { // muestra todo si pasa lo que dice el filtro

            if (prod.cost >= minimo && prod.cost <= maximo) { // Busco los valores que se encuentren entre los rangos ingresados


                // creo mis variables y divs
                var Div1 = document.createElement("div");
                var Div2 = document.createElement("div");
                var IMG = document.createElement('img');
                var Div3 = document.createElement('div');
                var Div4 = document.createElement('div');
                var nombre = document.createElement('h4');
                var P = document.createElement('p');
                var DivItem = document.createElement('div');
                var A = document.createElement('a'); // comentarios
                var div_column_md_4 = document.createElement('div'); // NUEVO
                var div_card =  document.createElement('div'); // NUEVO
                var div_card_body =  document.createElement('div'); // NUEVO

                //agrego las clases...
               // DivItem.classList.add('list-group-item', 'list-group-item-action');
                Div1.classList.add('row');
                Div2.classList.add('col-3');
                // IMG.classList.add('img-thumbnail');
                IMG.classList.add('img-thumbnail', 'card-img-top');//NUEVO
                Div3.classList.add('col');
                Div4.classList.add('d-flex', 'w-100', 'justify-content-between');
                nombre.classList.add('mb-1');
                P.classList.add('mb-1');
                // A.classList.add('list-group-item', 'list-group-item-action');
                div_column_md_4.classList.add('col-md-4'); //NUEVO
                div_card.classList.add('card', 'mb-4', 'shadow-sm'); //Nuevo
                div_card_body.classList.add('card-body');//NUEVO

                IMG.setAttribute("src", prod.imgSrc);// arega las imagenes
                //cargo los datos en las vatiables
                nombre.appendChild(document.createTextNode(`Name: ${prod.name} `));
                P.appendChild(document.createTextNode(`Description: ${prod.description}`));
                P.appendChild(document.createElement("br"));// genera un enter
                P.appendChild(document.createTextNode(`Cost: ${prod.cost}`));
                P.appendChild(document.createElement("br"));// genera un enter
                P.appendChild(document.createTextNode(`Currency: ${prod.currency}`));
                P.appendChild(document.createElement("br"));// genera un enter
                IMG.appendChild(document.createTextNode(`ImgScr: ${prod.imgSrc}`));
                P.appendChild(document.createTextNode(`SoldCount: ${prod.soldCount}`));
                A.setAttribute("href","product-info.html");
                A.style.textDecoration = "inherit";

                //ubico cada div en su lugar
                // Div2.appendChild(IMG);
                Div4.appendChild(nombre);
                Div3.appendChild(Div4);
                Div3.appendChild(P);
                div_card_body.appendChild(Div3);
               // Div1.appendChild(Div2);
                // Div1.appendChild(Div3);
                div_card.appendChild(IMG);//nuevo
                div_card.appendChild(div_card_body); //nuevo
                // A.appendChild(Div1); // llamado a product-info.html
               // DivItem.appendChild(A);
               A.appendChild(div_card);//NUEVO
               div_column_md_4.appendChild(A); //NUEVO

               contenedor.appendChild(div_column_md_4);//cargo el listado total en la constante que  //NUEVO
               //se mostrara en pantalla

                //contenedor.appendChild(DivItem);//cargo el listado total en la constante que 
                //se mostrara en pantalla

            }
        }
    }
};

document.addEventListener("DOMContentLoaded", async function (e) {

    const productos = (await getJSONData(PRODUCTS_URL)).data;
    const minimo = 0; //  controlo que no sea menor a 0
    const maximo = Number.POSITIVE_INFINITY;// controlo que sea un positivo infinito
    var orden = "MinOrden";
    var valorBusca = "";

    showList(productos, minimo, maximo, orden, valorBusca);

    document.getElementById("busca").addEventListener("keyup", () => {
        valorBusca = document.getElementById("busca").value;
        valorBusca.toLowerCase();
        showList(productos, minimo, maximo, orden, valorBusca);

    });

    document.getElementById("btnBuscar").addEventListener("click", () => { // obtengo los valores para filtrar y mostrar
        const CostoMinimo = document.getElementById("MinCost");
        const CostoMaximo = document.getElementById("MaxCost");
        const min = CostoMinimo.value;
        const max = CostoMaximo.value;

        if (min <= max) {
            showList(productos, min, max, orden, valorBusca);
        } else {
            alert(" El valor minimo debe ser menor que el maximo");
        }
    });

    document.getElementById("asc").addEventListener("change", () => { //Clic para cambiar orden asc. o desc.
        if (document.getElementById('asc').checked) {
            orden = "MinOrden";
            showList(productos, minimo, maximo, orden, valorBusca);
        } else if (document.getElementById('desc').checked) {
            orden = "MaxOrden";
            showList(productos, minimo, maximo, orden, valorBusca);
        } else {
            orden = "rele";
            showList(productos, minimo, maximo, orden, valorBusca);
        }

    });


    document.getElementById("desc").addEventListener("change", () => { //Clic para cambiar orden asc. o desc.
        if (document.getElementById('desc').checked) {
            orden = "MaxOrden";
            showList(productos, minimo, maximo, orden, valorBusca);;
        } else if (document.getElementById('asc').checked) {
            orden = "MinOrden";
            showList(productos, minimo, maximo, orden, valorBusca);
        } else {
            orden = "rele";
            showList(productos, minimo, maximo, orden, valorBusca);
        }

    });


    document.getElementById("rele").addEventListener("change", () => { //Clic para saber si estoy en relevante.
        if (document.getElementById('desc').checked) {
            orden = "MaxOrden";
            showList(productos, minimo, maximo, orden, valorBusca);;
        } else if (document.getElementById('asc').checked) {
            orden = "MinOrden";
            showList(productos, minimo, maximo, orden, valorBusca);
        } else {
            orden = "rele";
            showList(productos, minimo, maximo, orden, valorBusca);
        }

    });


});

