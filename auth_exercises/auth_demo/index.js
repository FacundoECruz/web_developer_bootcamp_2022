const express = require('express')
const app = express()
const user = require('./models/user')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/secret', (req, res) => {
    res.send('This is a secret')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(3000, () => {
    console.log('LISTENING ON 3000')
})