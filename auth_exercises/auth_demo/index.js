const express = require('express')
const app = express()
const user = require('./models/user')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

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