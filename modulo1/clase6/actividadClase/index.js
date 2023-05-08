const express = require('express')
const path = require('path')
const app = express();

let usuarioTest = [
   {
      id: 1,
      nombre: "Hernan",
      apellido: "Rojas",
      edad: 27,
      correo: "horojas96@gmail.com"
   },
   {
      id: 2,
      nombre: "Jorge",
      apellido: "Perez",
      edad: 35,
      correo: "jorgeperez@gmail.com"
   },
   {
      id: 3,
      nombre: "Martin",
      apellido: "Cepeda",
      edad: 21,
      correo: "martincepeda@gmail.com"
   }
]


app.get('/', (req, res) => {
   res.send('Hola mundo con express')
})

app.get('/hello', (req, res) => {
   res.send('Hola mundo con express HELLO')
})

app.get('/info', (req, res) => {
   res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/bienvenida', (req, res) => {
   res.sendFile(path.join(__dirname + '/bienvenida.html'))
})

app.get('/usuario/:id', (req, res) => {
   let id = req.params.id

   let userFound = usuarioTest.find((elem) => {
      return elem.id == id
   })

   console.log(userFound);

   if (!userFound) {
      res.send('User not found')
   } else {
      res.send(userFound);
   }
   
})

app.get('/getUsers', (req, res) => {
   res.send(usuarioTest)
})

app.get('/login', (req, res) => {
   console.log(req.query)
   
   res.send(usuarioTest)
})

app.listen(8080, () => console.log("Server running on port 8080"))