const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/greet', (req, res) => {
    console.log(req.cookies)
    const { name = 'Sin-nombre' } = req.cookies;
    res.send(`Hola, ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Antone')
    res.send('Cookie enviada')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})