const fs = require('fs')

class productManager {
   constructor(path) {
      this.path = path;
      this.products = [];
      this.#lastProductId = 0;
   }
   #lastProductId;

   async addProduct(title, description, price, thumbnail, code, stock) {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            console.log(data)
            return false;
         }
         const products = JSON.parse(data);

         if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("There's an input missing!")
            return false;
         }

         const existingProduct = products.find((product) => product.code === code);
         if (existingProduct) {
            console.error(`There is another product with code ${code}, please retry with another code.`);
            return false;
         }

         const newProduct = {
            id: products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
         };

         products.push(newProduct);

         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
         console.log(`Product "${newProduct.title}" added successfully!`);
         return true;
      } catch (error) {
         console.error('ERROR creating the product' + error);
         return false;
      }
   }

   async updateProduct(id, updates) {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            console.log(data)
            return false;
         }
         const products = JSON.parse(data);
         const index = products.findIndex((product) => product.id === id);
         if (index === -1) {
            console.error(`Product with id ${id} not found.`);
            return false;
         }
         const product = products[index];
         const updatedProduct = { ...product, ...updates };
         products.splice(index, 1, updatedProduct);
         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
         console.log(`Product "${product.title}" updated successfully!`);
         return true;
      } catch (error) {
         console.error(`ERROR updating the product with id ${id}\n`, error);
         return false;
      }
   }

   async addProduct(title, description, price, thumbnail, code, stock) {
      try {
         if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("There's an input missing!")
            return false;
         }

         const existingProduct = this.products.find((product) => product.code === code);
         if (existingProduct) {
            console.error(`There is another product with code ${code}, please retry with another code.`);
            return false;
         }

         const newProduct = {
            id: ++this.#lastProductId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
         };

         this.products.push(newProduct);

         await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
         console.log(`Product "${newProduct.title}" added succesfully!`);
      } catch (error) {
         console.error('ERROR creating the product' + error);
      }
   }

   async getProducts() {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            console.log(data)
            return [];
         }
         const products = JSON.parse(data);
         console.log("Products:")
         console.table(products)
         return products
      } catch (error) {
         console.error('ERROR getting the products list\n' + error);
      }
   }

   async getProductsById(id) {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            return null;
         }
         const products = JSON.parse(data);
         const product = products.find((product) => product.id === id);
         if (!product) {
            console.log(`Product with id ${id} doesn't exist.`);
            return null;
         }
         console.log("Product:")
         console.table(product)
         return product;
      } catch (error) {
         console.error(`ERROR getting the product with id ${id}\n` + error);
         return null;
      }
   }

   async deleteProduct(id) {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            console.log(data)
            return false;
         }
         const products = JSON.parse(data);
         const index = products.findIndex((product) => product.id === id);
         if (index === -1) {
            console.error(`Product with id ${id} not found.`);
            return false;
         }
         const product = products[index];
         products.splice(index, 1);
         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
         console.log(`Product "${product.title}" deleted successfully!`);
         return true;
      } catch (error) {
         console.error(`ERROR deleting the product with id ${id}\n`, error);
         return false;
      }
   }
}




//! TESTING

let pm = new productManager('./products.json');

setTimeout(async () => {
   console.log("TEST 1 --> getProducts debe ser un array vacio.")
   await pm.getProducts();
   console.log();
}, 1000);

setTimeout(async () => {
   console.log("TEST 2 --> addProduct debe agregar correctamente un producto")
   await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
   console.log();
}, 2000);

setTimeout(async () => {
   console.log("TEST 3 --> addProduct debe agregar correctamente un segundo producto")
   await pm.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen", "abc1234", 25);
   console.log();
}, 3000);

setTimeout(async () => {
   console.log("TEST 4 --> addProduct debe agregar correctamente un tercer producto")
   await pm.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen", "abc12345", 25);
   console.log();
}, 4000);

setTimeout(async () => {
   console.log("TEST 5 --> getProducts debe devolver tres productos")
   await pm.getProducts();
   console.log();
}, 5000);

setTimeout(async () => {
   console.log("TEST 6 --> addProduct con un id repetido debe devolver error")
   await pm.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen", "abc12345", 25);
   console.log();
}, 6000);

setTimeout(async () => {
   console.log("TEST 7 --> getProductById debe devolver el producto solicitado")
   await pm.getProductsById(1);
   console.log();
}, 7000);

setTimeout(async () => {
   console.log("TEST 8 --> getProductById con un ID inexistente debe devolver error")
   await pm.getProductsById(58);
   console.log();
}, 8000);

setTimeout(async () => {
   console.log("TEST 9 --> deleteProduct debe borrar el producto con el id ingresado")
   pm.deleteProduct(2);
   console.log();
}, 9000);

setTimeout(async () => {
   console.log("TEST 10 --> getProducts debe devolver la lista sin el producto con id '2'")
   await pm.getProducts();
   console.log();
}, 10000);

setTimeout(async () => {
   console.log("TEST 11 --> updateProduct debe actualizar correctamente un producto")
   await pm.updateProduct(1, { price: 250, title: "producto actualizado" });
   await pm.getProducts();
   console.log();
}, 11000);
