const fs = require('fs');

class CartManager {
   constructor(path) {
      this.path = path;
      this.carts = [];
      this.lastCartId = 0;
      this.loadCarts();
   }

   async loadCarts() {
      try {
         const data = await fs.promises.readFile(this.path, 'utf8');
         this.carts = JSON.parse(data);
         this.lastCartId = Math.max(...this.carts.map((cart) => cart.id), 0) + 1;
      } catch (error) {
         if (error.code === 'ENOENT') {
            await fs.promises.writeFile(this.path, '[]', 'utf8');
         } else {
            throw new Error(`Error loading carts data: ${error}`);
         }
      }
   }

   async saveCarts() {
      try {
         await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
      } catch (error) {
         throw new Error(`Error saving carts data: ${error}`);
      }
   }

   async addCart() {
      const cart = {
         id: this.lastCartId,
         cartProducts: [],
      };
      this.carts.push(cart);
      this.lastCartId++;
      await this.saveCarts();
      console.log(cart);
      return cart;
   }

   async getCartById(id) {
      const cart = this.carts.find((carts) => carts.id === id);
      if (!carts) {
         throw new Error(`Cart with id ${id} not found`);
      }
      return cart;
   }

   async addToCart(id, pid, quantity = 1) {
      const cart = await this.getCartById(id);
      let product = cart.cartProducts.find((p) => p.id === pid);
      if (!product) {
         product = {
            id: pid,
            quantity: 0,
         };
         cart.cartProducts.push(product);
      }
      product.quantity += quantity;
      await this.saveCarts();
      return product;
   }
}

module.exports = CartManager;
