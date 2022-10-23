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

const userSchema = new Schema({
    username: String, 
    age: Number
})

const tweetSchema = new Schema({
    text: String, 
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const user = mongoose.model('User', userSchema);
const tweet = mongoose.model('Tweet', tweetSchema);

