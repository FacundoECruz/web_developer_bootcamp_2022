const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('secret'))

app.get('/greet', (req, res) => {
    const { name = 'Sin-nombre' } = req.cookies;
    res.send(`Hola, ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Antone')
    res.send('Cookie enviada')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('food', 'alfajor', { signed: true })
    res.send('Cookie firmada')
})



app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})