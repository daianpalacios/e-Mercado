const express = require('express');
const app = express();
const cors = require("cors");
const fs = require('fs');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//GET
//////////////////////////////////////////////////////////////////////////////////
//CATEGORY
app.get('/category/all.json',(req,res) => {
    res.sendFile(__dirname + "/json/category/all.json");
});

app.get('/category/1234.json',(req,res) => {
    res.sendFile(__dirname + "/json/category/1234.json");
});

//PRODUCTS
app.get('/product/publish.json',(req,res) => {
    res.sendFile(__dirname + "/json/product/publish.json");
});

app.get('/product/all.json',(req,res) => {
    res.sendFile(__dirname + "/json/product/all.json");
});

app.get('/product/5678.json',(req,res) => {
    res.sendFile(__dirname + "/json/product/5678.json");
});

app.get('/product/5678-comments.json',(req,res) => {
    res.sendFile(__dirname + "/json/product/5678-comments.json");
});

//CART
app.get('/cart/654.json',(req,res) => {
    res.sendFile(__dirname + "/json/cart/654.json");
});

app.get('/cart/buy.json',(req,res) => {
    res.sendFile(__dirname + "/json/cart/buy.json");
});
///////////////////////////////////////////////////////////////////////////////////////////

//POST
//DESAFIATE 8

app.post ('/buyCart',function(req, res) { 
    let cartInfo = JSON.stringify(req.body);
    let ruta = "sale.txt";

    fs.writeFileSync(ruta,cartInfo);
  });
//////////////////////////////////////////////////////////////////////////////////////

  app.listen(3000, function () {  
    console.log('listening on 3000')
});
