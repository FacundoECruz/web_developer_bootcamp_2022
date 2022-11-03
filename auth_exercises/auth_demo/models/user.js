const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Se requiere nombre de usuario']
    },
    password: {
        type: String,
        required: [true, 'Se requiere contraseña']
    }
})

module.exprts = mongoose.model('User', userSchema);