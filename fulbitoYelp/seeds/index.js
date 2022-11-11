const mongoose = require('mongoose');
const SoccerField = require('../models/soccerField')
const cities = require('./cities');
const { names } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/YelpSoccer', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONECTED TO MONGO")
    })
    .catch(err => {
        console.log('ERROR')
        console.log(err)
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})


for (let i = 0; i < 20; i++) {
    const random24 = Math.floor(Math.random() * 24);
    const price = Math.floor(Math.random() * 2000) + 10;
    const field = new SoccerField({
        author: '636c002880d61d9aac034c2f',
        title: `${names[i]}`,
        location: `${cities[random24].nombre_completo}`,
        image: 'https://imgar.zonapropcdn.com/avisos/1/00/44/29/27/76/1200x1200/1724306414.jpg',
        description: 'Cancha de futbol 5 para disfrutar con amigues, despues te escabias y te jugas un altisima, en breve el anotador online.',
        price
    })
    field.save()
        .then(field => {
            console.log(field)
        })
        .catch(e => {
            console.log(e)
        })
}



