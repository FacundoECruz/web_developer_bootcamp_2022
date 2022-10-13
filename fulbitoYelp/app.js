const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const SoccerField = require('./models/soccerField')

mongoose.connect('mongodb://localhost:27017/YelpSoccer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
    const field = new SoccerField({title: 'Fulwacho', description: 'Futbol champagne'});
    await field.save();
    res.send(field);
})

app.listen(3000, () => {
    console.log('ON 3000')
})