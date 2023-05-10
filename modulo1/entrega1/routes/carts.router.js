const express = require('express');
const router = express.Router();
const cartManager = require('../cartManager');

const cm = new cartManager('./carts.json');

// Endpoint para crear un nuevo carrito
router.post('/', async (req, res) => {
   try {
      const newCart = await cm.addCart();
      res.status(201).json(newCart);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// Endpoint para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
   try {
      const cartId = req.params.cid;
      const cart = await cm.getCartById(cartId);
      res.json(cart);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
});

// Endpoint para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
   try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = parseInt(req.body.quantity);

      const updatedCart = await cm.addToCart(cartId, productId, quantity);
      res.json(updatedCart);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = router;
