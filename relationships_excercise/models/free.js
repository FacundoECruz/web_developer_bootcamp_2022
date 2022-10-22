const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/compe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const freeSchema = new Schema({
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

const compeSchema = new Schema({
    name: String,
    location: String,
    competitors: [{ type: Schema.Types.ObjectId, ref: 'Free' }]
})

const Free = mongoose.model('Free', freeSchema); 
const Compe = mongoose.model('Compe', compeSchema);

const makeCompe = async () => {
    const compe = new Compe({name: 'Supremacia', location: 'Perú'})
    const campeon = await Free.findOne({ name: 'Aczino' })
    compe.competitors.push(campeon)
    await compe.save()
    console.log(compe)
}

const addFree = async () => {
    const compe = await Compe.findOne({ name: 'Supremacia' })
    const free = await Free.findOne({ name: 'Gazir' })
    compe.competitors.push(free)
    await compe.save()
    console.log(compe)
}

addFree()


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

// addCompe('63543f0dd314777564803b7d')

// Free.insertMany([
//     {name: 'Aczino', country: 'México'},
//     {name: 'Rapder', country: 'México'},
//     {name: 'Gazir', country: 'España'},
//     {name: 'Wos', country: 'Argentina'}
// ])

