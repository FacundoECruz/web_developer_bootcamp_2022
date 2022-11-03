const express = require('express')
const app = express()
const user = require('./models/user')

app.get('/secret', (req, res) => {
    res.send('Esto es un secreto')
})

app.listen(3000, () => {
    console.log('LISTENING ON 3000')
})