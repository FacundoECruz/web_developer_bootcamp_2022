const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/compe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const freeSchema = new mongoose.Schema({
    name: String, 
    country: String,
    champion: [
        {
            competition: String,
            year: Number,
            location: String,
            scope: String
        }
    ]
})

const Free = mongoose.model('Free', freeSchema); 

const makeFree = async () => {
    const f = new Free({
        name: 'Chuty',
        country: 'España',
    })
    f.champion.push({
        competition: 'Red Bull',
        year: 2013,
        location: 'España',
        scope: 'Internacional'
    })
    const res = await f.save()
    console.log(res)
}

const addCompe = async (id) => {
    const f = await Free.findById(id)
    f.champion.push({
        competition: 'Red Bull',
        year: 2017,
        location: 'España',
        scope: 'Nacional'
    })
    const res = await f.save()
    console.log(res)
}

addCompe('63543f0dd314777564803b7d')