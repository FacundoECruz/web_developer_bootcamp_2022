const express = require('express')
const app = express()

app.get('/greet', (req, res) => {
    res.send("Hola")
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Antone')
    res.send('Cookie enviada')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})