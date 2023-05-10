const express = require('express');
const router = express.Router();
const productManager = require('../productManager');

// Instancia un objeto de productManager
const pm = new productManager('./products.json');



//! Ruta para obtener todos los productos
router.get('/', async (req, res) => {
   try {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;

      const products = await pm.getProducts(limit);
      res.json(products);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

//! Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
   console.log(req.body)
   const { title, description, price, thumbnail, code, stock, status } = req.body;
   try {
      const result = await pm.addProduct(title, description, price, thumbnail, code, stock, status);
      if (result.statusCode === 201) {
         res.status(201).json(result.product);
      } else {
         res.status(result.statusCode).json({ error: result.message });
      }
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Internal server error' });
   }
});

//! Ruta para actualizar un producto existente
router.put('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   const { title, description, price, thumbnail, code, stock, status } = req.body;
   try {
      const updatedProduct = await pm.updateProduct(id, { title, description, price, thumbnail, code, stock, status });
      if (updatedProduct) {
         res.json(updatedProduct);
      } else {
         res.status(404).json({ error: `Product with id ${id} not found` });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

//! Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   try {
      const product = await pm.getProductById(id);
      if (product) {
         res.json(product);
      } else {
         res.status(404).json({ error: `Product with id ${id} not found` });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

//! Ruta para eliminar un producto existente
router.delete('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   try {
      const deletedProductId = await pm.deleteProduct(id);
      res.json({ message: `Product with id ${deletedProductId} deleted` });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Product with id ${id} not found` });
   }
});

module.exports = router;