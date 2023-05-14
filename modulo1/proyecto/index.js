// Crear servidor
const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT

// Import http
const http = require('http')
const server = http.createServer(app)

// Views engine require
const handlebars = require('express-handlebars')

// Import routes
const homeRouter = require('./router/home.router')

// Import socket
const { Server } = require('socket.io')
const io = new Server(server)

// Public
app.use(express.static(__dirname + '/public'))

// Views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// Routes
app.use('/home', homeRouter)

let messages = []

// Socket
io.on('connection', (socket) => {
   console.log('New user connected')
   socket.emit('Welcome', 'Welcome user!')

   socket.on('new-message', (data) => {
      console.log(data)
      messages.push(data)
      io.sockets.emit('messages-all', messages)
   })
})










// Start server
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})