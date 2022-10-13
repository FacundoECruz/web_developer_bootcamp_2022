const mongoose = require('mongoose');
const SoccerField = require('../models/soccerField')
const cities = require('./cities');

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


//const seedDB = () => {
    for (let i = 0; i < 20; i++){
        const random24 = Math.floor(Math.random() * 24);
        const field = new SoccerField({
            location: `${cities[random24].nombre_completo}`
        })
        field.save()
        .then(field => {
            console.log(field)
        })
        .catch(e => {
            console.log(e)
        })
    }
//}

//seedDB;
