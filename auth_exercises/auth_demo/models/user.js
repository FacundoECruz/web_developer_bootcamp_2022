const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Se requiere nombre de usuario']
    },
    password: {
        type: String,
        required: [true, 'Se requiere contraseña']
    }
})

module.exports = mongoose.model('User', userSchema);