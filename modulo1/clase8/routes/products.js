const express = require('express')

const app = express()
const router = new Router()

router.get('/', (req, res) => {
   res.send('Hola mundo soy productos')
})
