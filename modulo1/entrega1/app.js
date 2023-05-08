const express = require('express')
const app = express()

// routes import
const mainRouter = require('./routes/main.router');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');

// routes use
app.use('/', mainRouter);
app.use('/', productsRouter);
app.use('/', cartRouter);


// server listening to port 8080
app.listen(8080, () => {
   console.log('listening on port 8080')
})