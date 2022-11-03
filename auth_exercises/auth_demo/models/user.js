const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Se requiere nombre de usuario']
    },
    password: {
        type: String,
        required: [true, 'Se requiere contraseña']
    }
})