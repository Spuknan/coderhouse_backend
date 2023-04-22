const fs = require('fs')

class ProductManager {
   constructor(path) {
      try {
         const data = fs.readFileSync(path, 'utf-8');
         this.products = JSON.parse(data);
         this.#lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
         this.path = path;
      } catch (error) {
         this.products = [];
         this.#lastProductId = 0;
         this.path = path;
      }
   }
   #lastProductId;

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
         const index = this.products.findIndex((product) => product.id === id);
         if (index === -1) {
            console.error(`Product with id ${id} not found.`);
            return false;
         }
         const product = this.products[index];
         this.products.splice(index, 1);
         await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
         console.log(`Product "${product.title}" deleted successfully!`);
         return true;
      } catch (error) {
         console.error(`ERROR deleting the product with id ${id}\n`, error);
         return false;
      }
   }
}


module.exports = ProductManager;