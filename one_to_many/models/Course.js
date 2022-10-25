const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: String,
    teacher: String,
    weeks: Number,
    college: {
        type: Schema.Types.ObjectId,
        ref: 'College'
    }
})

module.exports = mongoose.model('Course', courseSchema);