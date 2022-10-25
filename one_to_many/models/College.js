const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collegeSchema = new Schema({
    name: String,
    location: String,
    modality: String,
    courses: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Course'
        }
    ]
})

module.exports = mongoose.model('College', collegeSchema);