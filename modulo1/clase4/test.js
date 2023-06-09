const productManager = require('./productManager');

const runTests = async () => {
   const pm = new productManager('./products.json');
   console.clear()

   try {
      console.log("TEST 1 --> getProducts debe ser un array vacio. Si el archivo no existe, debe crearlo.");
      let products = await pm.getProducts();
      console.log("Products", products);
      console.log()

      console.log("TEST 2 --> addProduct debe agregar correctamente un producto");
      await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
      console.log(`Producto agregado correctamente`);
      console.log()

      console.log("TEST 3 --> addProduct debe agregar correctamente un segundo producto");
      await pm.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen", "abc1234", 25);
      console.log(`Producto agregado correctamente`);
      console.log()

      console.log("TEST 4 --> addProduct debe agregar correctamente un tercer producto");
      await pm.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen", "abc12345", 25);
      console.log(`Producto agregado correctamente`);
      console.log()

      console.log("TEST 5 --> getProducts debe devolver tres productos");
      products = await pm.getProducts();
      console.table(products);
      console.log()

      console.log("TEST 6 --> addProduct con un id repetido debe devolver error");
      await pm.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen", "abc12345", 25);
      console.log()

      console.log("TEST 7 --> getProductById debe devolver el producto solicitado");
      await pm.getProductById(1);
      console.log()

      console.log("TEST 8 --> getProductById con un ID inexistente debe devolver error");
      await pm.getProductById(58);
      console.log()

      console.log("TEST 9 --> deleteProduct debe borrar el producto con el id ingresado");
      await pm.deleteProduct(2);
      console.log()

      console.log("TEST 10 --> getProducts debe devolver la lista sin el producto con id '2'");
      products = await pm.getProducts();
      console.table(products);
      console.log()

      console.log("TEST 11 --> updateProduct debe actualizar correctamente un producto");
      await pm.updateProduct(1, { price: 250, title: "producto actualizado" });
      products = await pm.getProducts();
      console.table(products);
      console.log()

      console.log("TEST 12 --> updateProduct no debería reemplazar el id de un producto (id: 500)");
      await pm.updateProduct(1, { price: 250, title: "producto actualizado", id: 500 });
      products = await pm.getProducts();
      console.table(products);
      console.log()

      console.log("TEST 13 --> addProduct debe agregar un producto con un id nuevo");
      await pm.addProduct("producto prueba4", "Este es un producto prueba4", 212, "Sin imagen", "abc123456", 30);
      console.log()

      console.log("TEST 14 --> getProducts debe devolver la lista con todos los productos");
      products = await pm.getProducts();
      console.table(products);
      console.log()

      console.log("TEST 13 --> updateProduct no debería actualizar un producto con un code repetido");
      await pm.updateProduct(3, { price: 600, title: "Producto fallido", code: "abc123"});
      products = await pm.getProducts();
      console.log("Products", products);
      console.log()

   } catch (err) {
      console.error(err);
   }
}

runTests();
