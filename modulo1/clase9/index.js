const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

const routerUser = require('./routes/users.router')

app.use('/users', routerUser)

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


let testUsers = [
   {
      name: 'Hernan',
      lastName: 'Rojas',
      age: '27',
      email: "horojas96@gmail.com",
      phone: '1150358772'
   },
   {
      name: 'Juan',
      lastName: 'Gonzalez',
      age: '28',
      email: "juan.gonzalez@gmail.com",
      phone: '1184785236'
   },
   {
      name: 'Jose',
      lastName: 'Perez',
      age: '29',
      email: "jose.perez@gmail.com",
      phone: '1187523698'
   },
   {
      name: 'Pedro',
      lastName: 'Rodriguez',
      age: '30',
      email: "pedro.rodriguez@gmail.com",
      phone: '1187654321'
   },
   {
      name: 'Marta',
      lastName: 'Garcia',
      age: '31',
      email: "marta.garcia@gmail.com",
      phone: '1187654321'
   }
]

app.get('/', (req, res) => {
   let user = {
      name: 'Maria'
   }
   res.render('index', user)
})

app.get('/test', (req, res) => {
   let index = Math.floor(Math.random() * testUsers.length)
   let user = testUsers[index]

   res.render('test', user)
})

let arrayProduct = [
   {
      title: 'tv',
      price: 545
   },
   {
      title: 'radio',
      price: 654
   },
   {
      title: 'pc',
      price: 1052
   },
   {
      title: 'screen',
      price: 874
   }
]

app.get('/testHand', (req, res) => {
   let user = {
      name: 'Hilda',
      lastName: 'Martinez',
      role: 'user'
   }

   res.render('users', {
      products: arrayProduct,
      user: user,
      isAdmin: user.role === 'admin'
   })
})

app.listen(8080, () => {
   console.log('listening on port 8080')
})