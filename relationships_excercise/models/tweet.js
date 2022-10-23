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
    const user = await User.findOne({ name: 'lokillo'})
    const tweet2 = new Tweet({ text: 'le gane a Larrix', likes: 11})
    tweet2.user = user
    user.save()
    tweet2.save()
}

const findTweet = async () => {
    const t = await Tweet.findOne({})
        .populate('user', 'username')
        .then(tweet => console.log(tweet))
}

findTweet()