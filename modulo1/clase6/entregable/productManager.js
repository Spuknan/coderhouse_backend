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

   async getProducts() {
      try {
         const data = await fs.promises.readFile(this.path, 'utf-8');
         if (!data) {
            console.log("There are no products loaded.")
            return [];
         }
         const products = JSON.parse(data);
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


module.exports = productManager;