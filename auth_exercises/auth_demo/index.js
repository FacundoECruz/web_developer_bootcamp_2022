const express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));

const sessionConfig = { secret: 'notagoodsecret', resave: false, saveUninitialized: true }
app.use(session(sessionConfig))

app.get('/', (req, res) => {
    res.send('This is the home page')
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login')
})

app.get('/secret', (req, res) => {
    if(!req.session.user_id){
        res.redirect('/login')
    } else
    res.render('secret')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ 
        username, 
        password: hash 
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login',async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
        req.session.user_id = user._id;
        res.send('Bien ahi!! Logueado!!!')
    } else {
        res.send('Mal ahi! Intenta de nuevo!')
    }
})

app.listen(3000, () => {
    console.log('LISTENING ON 3000')
})