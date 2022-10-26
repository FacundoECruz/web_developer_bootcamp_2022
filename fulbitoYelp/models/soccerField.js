const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const SoccerFieldSchema = new Schema({
    title: String,
    location: String,
    image: String, 
    price: Number,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},
{ collection: 'soccerfields' })

SoccerFieldSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('SoccerField', SoccerFieldSchema)