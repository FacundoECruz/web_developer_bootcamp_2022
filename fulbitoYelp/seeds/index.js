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


for (let i = 0; i < 50; i++) {
    const random24 = Math.floor(Math.random() * 24);
    const price = Math.floor(Math.random() * 2000) + 10;
    const field = new SoccerField({
        author: '6374047231e3883648513cf5',
        title: `${names[i]}`,
        location: `${cities[random24].city}, ${cities[random24].state}`,
        description: 'Cancha de futbol 5 para disfrutar con amigues, despues te escabias y te jugas un altisima, en breve el anotador online.',
        price,
        geometry: {
            type: "Point",
            coordinates: [
                cities[random24].longitude,
                cities[random24].latitude
            ]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/dfknsvqer/image/upload/v1669029780/YelpSoccer/oiny4nlw2r4kpqw585uu.jpg',
                filename: 'YelpSoccer/oiny4nlw2r4kpqw585uu',
            },
            {
                url: 'https://res.cloudinary.com/dfknsvqer/image/upload/v1669029819/YelpSoccer/fs1ydrzqymvcmd3mb3hy.jpg',
                filename: 'YelpSoccer/fs1ydrzqymvcmd3mb3hy',
            },
            {
                url: 'https://res.cloudinary.com/dfknsvqer/image/upload/v1669029851/YelpSoccer/pdy2sz0xwrdxbgmb3hir.jpg',
                filename: 'YelpSoccer/pdy2sz0xwrdxbgmb3hir',
            }
        ]
    })
    field.save()
        .then(field => {
            console.log(field)
        })
        .catch(e => {
            console.log(e)
        })
}



