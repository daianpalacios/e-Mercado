//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let SubTotalFinal = 0;//ENTREGA 7

const showCart = (productCart) => {

    let cartContent = document.getElementById("cartContent");
    let total = document.getElementById('total');
    let subTotal = document.getElementById('sub_total');
    let totalEnvio = document.getElementById('envio_final'); //ENTREGA 7
    let porcentajeEnvio = document.getElementsByName('TipoEnvio');//ENTREGA 7
    let auxTotal = 0;

    cartContent.innerHTML = '<div id="tableHead" class="row">'+
    '                           <div class="col-5">'+
    '                               Producto'+
    '                           </div>'+
    '                           <div class="col">'+
    '                               Cantidad'+
    '                           </div>'+
    '                           <div class="col">'+
    '                               Moneda'+
    '                           </div>'+
    '                           <div class="col">'+
    '                               Precio Unitario'+
    '                           </div>'+
    '                           <div class="col-2">'+
    '                               C.Cantidad $UY'+
    '                           </div>'+
    '                           <div class="col">'+
    '                               '+
    '                           </div>'+
    '                       </div>';

    totalEnvio = 0;

    for (let i = 0; i < productCart.articles.length; i++) {
        let articles = productCart.articles[i];
        let unidad_SubTotal = 0;


        unidad_SubTotal = TotalEnPesosUY(articles);

        // Creo variables para HTML
        let colImg = document.createElement("div");
        let artImg = document.createElement('img');
        let colName = document.createElement("div");
        let artName = document.createElement("p");
        let colCount = document.createElement("div");
        let artCount = document.createElement("input");
        let colCurrency = document.createElement("div");
        let artCurrency = document.createElement("p");
        let colCost = document.createElement("div");
        let artCost = document.createElement("p");
        let colSubTot = document.createElement("div");
        let rowlinea = document.createElement("div");
        let linea = document.createElement("hr");
        let colgrupo = document.createElement("div");
        let colTrash = document.createElement("div"); //DESAFIATE 7
        let btnTrash = ""//DESAFIATE 7


        // Agrego las clases correspondientes
        colImg.classList.add('col-2');
        artImg.classList.add('img-thumbnail');
        artImg.setAttribute("src", articles.src);// agrega las imagenes
        colName.classList.add('col-3');
        colCount.classList.add('col');
        artCount.classList.add("form-control");
        artCount.type = "text";
        artCount.setAttribute("id", "Cant_" + i)
        colCurrency.classList.add('col');
        colCost.classList.add('col');
        colTrash.classList.add('col','trash');
        colTrash.setAttribute('id','colTrash'+ i);
        colSubTot.classList.add('col', 'SubTot');
        colgrupo.classList.add('row', 'my-3', 'border', 'align-items-center');
        rowlinea.classList.add('row');
        btnTrash = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
        '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
        '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
        '</svg>';  //DESAFIATE 7

       
        //cargo los datos en las variables
        artImg.appendChild(document.createTextNode(`${articles.src}`));
        artName.appendChild(document.createTextNode(`${articles.name}`));
        artCount.appendChild(document.createTextNode(`${articles.count}`));
        artCount.value = articles.count;
        artCost.appendChild(document.createTextNode(`${articles.unitCost}`));
        artCurrency.appendChild(document.createTextNode(`${articles.currency}`));
        colSubTot.appendChild(document.createTextNode(`${unidad_SubTotal}`));

        //hubico cada div en su lugar
        colImg.appendChild(artImg);
        colName.appendChild(artName);
        colCount.appendChild(artCount);
        colCurrency.appendChild(artCurrency);
        colCost.appendChild(artCost);
        rowlinea.appendChild(linea);
        colgrupo.appendChild(colImg);
        colgrupo.appendChild(colName);
        colgrupo.appendChild(colCount);
        colgrupo.appendChild(colCurrency);
        colgrupo.appendChild(colCost);
        colgrupo.appendChild(colSubTot);
        colgrupo.appendChild(colTrash);

        cartContent.appendChild(colgrupo);

        auxTotal += TotalEnPesosUY(articles);
        // auxTotal += articles.unitCost * articles.count;
       let Trash = document.getElementById('colTrash'+ i); //DESAFIATE 7
       Trash.innerHTML = btnTrash;//DESAFIATE 7
    }

    //ENTREGA 7
    SubTotalFinal = auxTotal; // aca guardo el total del momento como subtotal para poder calcularle los porcentajes 
    subTotal.innerHTML = auxTotal;

    if (document.getElementById('Premium').checked) {
        porcentajeEnvio = document.getElementById('Premium').value;
        totalEnvio = auxTotal * porcentajeEnvio / 100;

    } else if (document.getElementById('Express').checked) {
        porcentajeEnvio = document.getElementById('Express').value;
        totalEnvio = auxTotal * porcentajeEnvio / 100;

    } else if (document.getElementById('Standar').checked) {
        porcentajeEnvio = document.getElementById('Standar').value;
        totalEnvio = auxTotal * porcentajeEnvio / 100;
    }

    total.innerHTML = SubTotalFinal + totalEnvio;

    plas(productCart);

    deleteElement(productCart);



};

//Funcion para calcular total
function plas(productCart) {

    let cantProduct = document.getElementsByClassName('form-control');
    let unidad_SubTotal = document.getElementsByClassName('SubTot');
    let subTotal = document.getElementById('sub_total');
    let total = document.getElementById('total');
    let envio = document.getElementsByName('TipoEnvio');

    let auxTotalAux = 0;

    for (let i = 0; i < cantProduct.length; i++) {
        cantProduct[i].addEventListener("keyup", () => {
            auxTotalAux = 0;

            for (let x = 0; x < cantProduct.length; x++) {
                let numCant = cantProduct[x].value;

                if (numCant > 0) {
                    productCart.articles[x].count = numCant;
                    unidad_SubTotal[x].innerHTML = TotalEnPesosUY(productCart.articles[x]);
                    auxTotalAux += TotalEnPesosUY(productCart.articles[x]);
                }
            }


            //Imprimo el total
            subTotal.innerHTML = auxTotalAux;
            total.innerHTML = auxTotalAux;

            SubTotalFinal = auxTotalAux;

            calcularEnvio()
        });
    }

}

//Funcion para eliminar un producto //DESAFIATE 7
function deleteElement(productCart) {

    let btnTrash = document.getElementsByClassName('trash');

    for (let i = 0; i < btnTrash.length; i++) {
        btnTrash[i].addEventListener("click", () => {
            productCart.articles.splice(i, 1);
            
            let cartContent = document.getElementById("cartContent");
            cartContent.innerHTML = "";
            showCart(productCart);
            
        });
    }

}

//Funcion para calcular importe en pesos
function TotalEnPesosUY(inArticle) {
    let totalPesosUY = 0;

    if (inArticle.currency == "USD") {
        totalPesosUY = inArticle.unitCost * 40 * inArticle.count;
    } else {
        totalPesosUY = inArticle.unitCost * inArticle.count;
    }
    return totalPesosUY;
}

// ENTREGA 7 // esto se ejecuta cuando se modifica la cantidad de productos a comprar o modo de envio
function calcularEnvio() {
    let total = document.getElementById('total');
    let totalEnvio = document.getElementById('envio_final');
    let porcentajeEnvio = 0;
    let auxEnvio = 0;
    totalEnvio.innerHTML = '';

    if (document.getElementById('Premium').checked) {
        porcentajeEnvio = document.getElementById('Premium').value;
        auxEnvio = parseInt(SubTotalFinal * porcentajeEnvio / 100);
        totalEnvio.innerHTML = parseInt(auxEnvio);
        total.innerHTML = SubTotalFinal + auxEnvio;

    } else if (document.getElementById('Express').checked) {
        porcentajeEnvio = document.getElementById('Express').value;
        auxEnvio = parseInt(SubTotalFinal * porcentajeEnvio / 100);
        totalEnvio.innerHTML = parseInt(auxEnvio);
        total.innerHTML = SubTotalFinal + auxEnvio;

    } else if (document.getElementById('Standar').checked) {
        porcentajeEnvio = document.getElementById('Standar').value;
        auxEnvio = parseInt(SubTotalFinal * porcentajeEnvio / 100);
        totalEnvio.innerHTML = parseInt(auxEnvio);
        total.innerHTML = SubTotalFinal + auxEnvio;
    }

}



//carga la pagina por primera vez
document.addEventListener("DOMContentLoaded", async function (e) {

    const productCart = (await getJSONData(CART_INFO_URL)).data;
    let tblCredito = document.getElementById('TblCredito');
    let tblTransfBancaria = document.getElementById('TblTransferencia');
    tblCredito.style.display = "none";
    tblTransfBancaria.style.display = "none";

    showCart(productCart);

    //ENTREGA 7

    document.getElementById("Premium").addEventListener("change", () => {
        calcularEnvio();
    });
    document.getElementById("Express").addEventListener("change", () => {
        calcularEnvio();
    });
    document.getElementById("Standar").addEventListener("change", () => {
        calcularEnvio();
    });

    document.getElementById("Credito").addEventListener("change", () => {
        if (document.getElementById('Credito').checked) {
            tblCredito.style.display = "block";
            tblTransfBancaria.style.display = "none";
        } else if (document.getElementById('TransfBancaria').checked) {
            tblCredito.style.display = "none";
            tblTransfBancaria.style.display = "block";
        }
    });

    document.getElementById("TransfBancaria").addEventListener("change", () => {
        if (document.getElementById('Credito').checked) {
            tblCredito.style.display = "block";
            tblTransfBancaria.style.display = "none";
        } else if (document.getElementById('TransfBancaria').checked) {
            tblCredito.style.display = "none";
            tblTransfBancaria.style.display = "block";
        }
    });

    document.getElementById("btnConfirmModal").addEventListener("click", () => {

        let okFormaDePago = false;
        let direccion = document.getElementById("direccion");
        let pais = document.getElementById("pais");
        let ok = false;

        let tipoEnvio = "";
        let modoPago = "";
        let TotalesSubTotal = document.getElementById("sub_total");
        let TotalesEnvio = document.getElementById("envio_final");
        let TotalesTotal = document.getElementById("total");

        let creditNombre = document.getElementById("CreditNombre");
        let creditNumTarjeta = document.getElementById("CreditNumTarjeta");
        let creditExpiraMM = document.getElementById("CreditExpiraMM");
        let creditExpiraDD = document.getElementById("CreditExpiraDD");
        let creditCVC = document.getElementById("CreditCVC");

        let transfBanco = document.getElementById("TransfBanco");
        let transfCuenta = document.getElementById("TransfCuenta");
        let transfTitular = document.getElementById("TransfTitular");

        if (document.getElementById('Credito').checked) {

            if (creditNombre.value == null || creditNombre.value == "" ||
                creditNumTarjeta.value == null || creditNumTarjeta.value == "" ||
                creditExpiraMM.value == null || creditExpiraMM.value == "" ||
                creditExpiraDD.value == null || creditExpiraDD.value == "" ||
                creditCVC.value == null || creditCVC.value == "") {
                alert("Debe completar todos los campos del credito");
            } else {
                okFormaDePago = true;
                modoPago = "Credito";
                document.getElementById("btnConfirmModal").setAttribute('data-dismiss', 'modal');

            }


        } else if (document.getElementById('TransfBancaria').checked) {

            if (transfBanco.value == null || transfBanco.value == "" ||
                transfCuenta.value == null || transfCuenta.value == "" ||
                transfTitular.value == null || transfTitular.value == "") {
                alert("Debe completar todos los campos de la transferencia");
            } else {
                okFormaDePago = true;
                modoPago = "Transferencia Bancaria";
                document.getElementById("btnConfirmModal").setAttribute('data-dismiss', 'modal');
            }

        }

        //chequeo cual esta seleccionado y si la direccion y el pais estan vacios
        if (document.getElementById('Premium').checked) {
            ok = true;
            tipoEnvio = "Premium";
        }

        if (document.getElementById('Express').checked) {
            ok = true;
            tipoEnvio = "Express";
        }

        if (document.getElementById('Standar').checked) {
            ok = true;
            tipoEnvio = "Standar";
        }

        if (direccion.value == null || direccion.value == "") {
            ok = false;
        }

        if (pais.value == null || pais.value == "") {
            ok = false;
        }
        if (ok == false || okFormaDePago == false) {
            if (ok == false) {
                alert("Deben completarse los campos de envio");
            }
        } else {
            alert("Venta realizada con exito!");


            //DESAFIATE 8
            let saleFile = { // Nuevo Array con toda la info a guardar en TXT
                "Productos": [
                    {
                        "ProductosJS": `${JSON.stringify(productCart)}`
                    }
                ],
                "Envio": [
                    {
                        "Direccion": `${direccion.value}`,
                        "Pais": `${pais.value}`,
                        "Tipo": `${tipoEnvio}`
                    }
                ],
                "Pago": [
                    {
                        "Modo de pago": `${modoPago}`,
                        "Nombre": `${creditNombre.value}`,
                        "Numero tarjeta": `${creditNumTarjeta.value}`,
                        "Exp Mes": `${creditExpiraMM.value}`,
                        "Exp Año": `${creditExpiraDD.value}`,
                        "CVC": `${creditCVC.value}`,
                        "Banco": `${transfBanco.value}`,
                        "Cuenta": `${transfCuenta.value}`,
                        "Titular": `${transfTitular.value}`
                    }
                ],
                "Totales": [
                    {
                        "Sub Total": `${TotalesSubTotal.textContent}`,
                        "Envio": `${TotalesEnvio.textContent}`,
                        "Total": `${TotalesTotal.textContent}`
                    }
                ],
            }


            fetch("http://localhost:3000/buyCart", { // Fetch de localhost para usar app.js
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleFile)
            })

        }

    });


    //DESAFIATE 7
    



});