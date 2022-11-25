const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema

const opts = { toJSON: { virtuals: true } };

const SoccerFieldSchema = new Schema({
    title: String,
    location: String,
    images: [
        {
            url: String,
            filename: String
        }
    ], 
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price: Number,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts, 
{ collection: 'soccerfields' })

SoccerFieldSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/soccerfields/${this.id}">${this.title}</a>`
})

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