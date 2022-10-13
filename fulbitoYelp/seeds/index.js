const mongoose = require('mongoose')
const SoccerField = require('../models/soccerField')

mongoose.connect('mongodb://localhost:27017/YelpSoccer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const seedDB = async () => {
    await SoccerField.deleteMany({});
    const s = new SoccerField({ title: 'Cancha' });
    await s.save();
}

seedDB;