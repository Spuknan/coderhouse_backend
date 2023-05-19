const express = require('express');
const router = express.Router();
const cartsManager = require('../managers/cartsManager');

// Iniciar una instancia de cartsManager
const cm = new cartsManager('./db/carts.json');

//! Crear nuevo carrito
router.post('/', async (req, res) => {
   try {
      const result = await cm.createCart();
      res.status(result.statusCode).send(result);
   } catch (error) {
      console.error(error);
      res.status(500).send({ statusCode: 500, message: "Internal server error" });
   }
});

//! Retornar carrito por su id
router.get('/:cid', async (req, res) => {
   try {
      const cid = req.params.cid;
      const result = await cm.getCart(cid);
      res.status(result.statusCode).send(result);
   } catch (error) {
      console.error(error);
      res.status(500).send({ statusCode: 500, message: "Internal server error" });
   }
});

//! Agregar un producto a un carrito especifico
router.post('/:cid/product/:pid', async (req, res) => {
   try {
      const cid = req.params.cid;
      const pid = req.params.pid;

      // Verificar si el producto existe
      const productExists = await pm.getProduct(pid);
      if (!productExists) {
         return res.status(404).send({ statusCode: 404, message: "Product not found" });
      }

      const result = await cm.addProductToCart(cid, pid);
      res.status(result.statusCode).send(result);
   } catch (error) {
      console.error(error);
      res.status(500).send({ statusCode: 500, message: "Internal server error" });
   }
});



module.exports = router;