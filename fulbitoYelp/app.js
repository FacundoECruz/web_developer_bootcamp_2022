const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/YelpSoccer');

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('ON 3000')
})