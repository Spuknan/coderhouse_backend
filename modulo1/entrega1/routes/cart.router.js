const express = require('express');
const { Router } = express
const router = new Router()

// Definir la ruta para la página principal
router.get('/cart', (req, res) => {
   res.send('Hello world cart');
});

// Exportar el router para usarlo en otros archivos
module.exports = router;