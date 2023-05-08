const express = require('express');
const app = express();
const PORT = 8080;
const uuid4 = require('uuid4');


let products = [];


app.get('/products', (req, res) => {
   res.send({ data: products, message: 'Todos los productos enviados' })
})

app.post('/createProduct', (req, res) => {
   // body
   let id = uuid4()
   let pr = req.body
   pr.id = id
   products.push(pr)
   res.send({ data: pr, message: 'Producto guardado correctamente' })
})

app.delete('/deleteProduct', (req, res) => {
   console.log(req.params)
   let id = req.params.id
   const arrayNew = products.filter((elem) => {
      return elem.id !== id
   })
   console.log(arrayNew)
   products = arrayNew
   res.send({ data: products, message: 'Producto eliminado correctamente.' })
})

app.put('/updateProduct/:id', (req, res) => {
   let id = req.params.id
   let infoNew = req.body

   let arrayUpdated = products.map((elem) => {
      if (elem.id == id) {
         return { ...elem, infoNew }
      } else {
         return elem
      }
   })
   console.log(arrayUpdated)
   res.send({ data: '', message: '' })
})











app.listen(PORT, () => {
   console.log("Server running on port: " + PORT)
})