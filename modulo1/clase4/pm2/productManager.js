const fs = require('fs')

class productManager {
   constructor(path) {
      this.path = path;
      this.products = [];
   }

   #lastProductId = 0;

   async getProducts() {
      try {
         const data = await fs.promises.readFile(this.path, 'utf8');
         this.products = JSON.parse(data);
         return data
      } catch (err) {
         if (err.code === 'ENOENT') { // Archivo no encontrado
            console.log("No file found with that specific name. Creating file...")
            await fs.promises.writeFile(this.path, '[]', 'utf8'); // Crear archivo vacío
            this.products = []; // Cargar productos vacíos
            return this.products
         } else {
            console.error(`Error loading products: ${err}`);
            this.products = [];
         }
      }
   }

   async addProduct(title, description, price, thumbnail, code, stock) {
      // Cargar los productos existentes
      await this.getProducts();

      // Comprobar que se proporcionan todos los datos necesarios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
         console.error("Missing product data");
         return false
      }

      // Generar un nuevo ID de producto
      const newProductId = ++this.#lastProductId;

      // Comprobar que no exista otro producto con el mismo code
      if (this.products.some(product => product.code === code)) {
         console.error(`A product with code ${code} already exists`);
         return false
      }

      // Crear un nuevo objeto de producto
      const newProduct = {
         id: newProductId,
         title: title,
         description: description,
         price: price,
         thumbnail: thumbnail,
         code: code,
         stock: stock
      };

      // Agregar el nuevo producto a la lista de productos
      this.products.push(newProduct);
      console.log("New product created:")
      console.table(newProduct)

      // Guardar los productos en el archivo JSON
      try {
         console.log(`Saving product in path file`)
         await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      } catch (error) {
         throw new Error(`Error saving product data: ${error}`);
      }

      // Devolver el nuevo objeto de producto
      return newProduct;
   }

   async updateProduct(id, newData) {
      // Cargar los productos existentes
      await this.getProducts();

      // Buscar el producto que coincide con el ID dado
      const productIndex = this.products.findIndex(product => product.id === id);

      if (productIndex === -1) {
         console.error(`Product with ID ${id} not found`);
         return null;
      }

      // Actualizar los campos del producto
      this.products[productIndex] = {
         ...this.products[productIndex], // Tomar todas las propiedades del objeto.
         ...newData, // Sobreescribir las propiedades con los nuevos valores.
         id: id // Obligar a mantener el id.
      };

      // Guardar los productos actualizados en el archivo JSON
      try {
         console.log(`Saving updated products to file`);
         await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      } catch (error) {
         throw new Error(`Error saving product data: ${error}`);
      }

      return this.products[productIndex];
   }

   async getProductById(id) {
      // Cargar los productos existentes
      await this.getProducts();

      // Buscar el producto por ID
      const product = this.products.find(p => p.id === id);

      if (!product) {
         console.log(`Couldn't find a product with id ${id}`)
         return null
      }

      // Devolver el producto
      console.log(`Product with id ${id} found:`)
      console.table(product)
      return product
   }

   async deleteProduct(id) {
      // Buscar el producto por ID
      await this.getProductById(id);
   
      // Filtrar la lista de productos para excluir el producto con el ID dado
      this.products = this.products.filter(product => product.id !== id);
   
      // Guardar los productos actualizados en el archivo JSON
      try {
         console.log(`Product with id ${id} deleted`);
         console.log(`Saving updated products list to file`);
         await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      } catch (error) {
         throw new Error(`Error saving product data: ${error}`);
      }
   
      return id;
   }
}

module.exports = productManager;