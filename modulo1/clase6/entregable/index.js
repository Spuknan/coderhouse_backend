const express = require('express')
const path = require('path')
const app = express();
const ProductManager = require('./productManager');

app.get('/', (req, res) => {
   res.send('Hola mundo con express')
})

app.get('/products', (req, res) => {
   let pm = new ProductManager('./products.json');

   

   res.send(pm.getProducts())
})

app.listen(8080, () => console.log("Server running on port 8080"))