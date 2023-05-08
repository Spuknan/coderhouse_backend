const express = require('express');
const { Router } = express
const router = new Router()

// Definir la ruta para la página principal
router.get('/', (req, res) => {
   res.send('Hello world main');
});

// Exportar el router para usarlo en otros archivos
module.exports = router;