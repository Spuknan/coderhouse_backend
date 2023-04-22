const express = require('express')
const app = express();
app.use(express.urlencoded({extended:true}))

const ProductManager = require('./productManager');
let pm = new ProductManager("./products.json")

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.get('/products', async (req, res) => {
   let { limit } = req.query;

   try {
      const products = await pm.getProducts();

      if (!limit) {
         res.send(products);
         console.table(products)
      } else {
         res.send(products.slice(0, limit));
         console.table(products.slice(0, limit))
      }
   } catch (err) {
      res.send("Error")
   }
});

app.get('/products/:pid', async (req, res) => {
   let pid = parseInt(req.params.pid);

   try {
      const product = await pm.getProductsById(pid);
      if (product) {
         res.json(product);
         console.log(product)
      } else {
         res.send(`Product with id ${pid} not found`);
      }
   } catch (err) {
      res.send("Error");
   }
});

app.listen(8080, () => console.log("Server running on port 8080"))
