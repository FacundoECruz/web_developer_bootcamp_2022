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
            location: String,
        }
    ]
})

const Free = mongoose.model('Free', freeSchema); 