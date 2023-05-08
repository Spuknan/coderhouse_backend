const express = require('express');
const { Router } = express
const router = new Router()

// Definir la ruta para la página principal
router.get('/products', (req, res) => {
   res.send('Hello world products');
});


// Exportar el router para usarlo en otros archivos
module.exports = router;