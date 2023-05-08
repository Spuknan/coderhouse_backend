const express = require('express')

const app = express()
const routesUsers = require('./routes/users')
const routesPets = require('./routes/pets')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next) {
   console.log("Time: ", Date.now())
   next()
})

app.use('/static', express.static(__dirname + '/public'))

app.use('/users', routesUsers)
app.use('/pets', routesPets)

app.listen(8080, () => {
   console.log('Server running on port 8080')
})