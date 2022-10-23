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

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async () => {
    const user = new User({ username: 'lokillo', age: 35})
    const tweet1 = new Tweet({ text: 'bailo sobre la mesa', likes: 23})
    tweet1.user = user
    user.save()
    tweet1.save()
}

makeTweet()