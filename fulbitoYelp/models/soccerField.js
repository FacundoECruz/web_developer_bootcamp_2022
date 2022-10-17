const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SoccerFieldSchema = new Schema({
    title: String,
    location: String,
    image: String, 
    price: Number,
    description: String
},
{ collection: 'soccerfields' })

module.exports = mongoose.model('SoccerField', SoccerFieldSchema)