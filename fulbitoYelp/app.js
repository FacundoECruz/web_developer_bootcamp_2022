const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const SoccerField = require('./models/soccerField')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Joi = require('joi')
const { soccerfieldSchema, reviewSchema } = require('./schemas.js')
const methodOverride = require('method-override')
const engine = require('ejs-mate')
const Review = require('./models/review')
const soccerfields = require('./routes/soccerfields')
const reviews = require('./routes/reviews')
const session = require('express-session')
const { date } = require('joi')

mongoose.connect('mongodb://localhost:27017/YelpSoccer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const app = express()

app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'palabraquedeberiasersecreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use('/soccerfields', soccerfields)
app.use('/soccerfields/:id/reviews', reviews)

app.get('/', async (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Página no encontrada', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = 'Algo malio sal'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('ON 3000')
})