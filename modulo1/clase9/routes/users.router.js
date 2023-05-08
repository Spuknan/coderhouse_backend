const express = require('express')

const { Router } = express
const router = new Router()

router.get('/', (req, res) => {
   res.render('index', {
      name: 'Hernan',
      lastName: 'Rojas',
      age: '27',
      email: "horojas96@gmail.com",
      phone: '1150358772'
   })
})

module.exports = router