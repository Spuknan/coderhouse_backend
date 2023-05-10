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

module.exports = router;