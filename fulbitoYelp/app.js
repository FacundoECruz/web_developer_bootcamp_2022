const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const SoccerField = require('./models/soccerField')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Joi = require('joi')
const methodOverride = require('method-override')
const engine = require('ejs-mate')

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

const validateSoccerfield = (req, res, next) => {
    const soccerfieldSchema = Joi.object({
        soccerfield: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
        }).required()
    }) 
    const { error } = soccerfieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
}

app.get('/', async (req, res) => {
    res.render('home')
})

app.get('/soccerfields', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield });
}))

app.get('/soccerfields/new', (req, res) => {
    res.render('soccerfields/new')
})

app.post('/soccerfields', catchAsync(async (req, res) => {
        // if(!req.body.soccerfield) throw new ExpressError('Información inválida', 400)
        const soccerfield = new SoccerField(req.body.soccerfield);
        await soccerfield.save();
        res.redirect(`/soccerfields/${soccerfield._id}`)
}))

app.get('/soccerfields/:id', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/show', { soccerfield })
}))

app.get('/soccerfields/:id/edit', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/edit', { soccerfield });
}))

app.put('/soccerfields/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield }, { new: true })
    res.redirect(`/soccerfields/${soccerfield.id}`)
}))

app.delete('/soccerfields/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    res.redirect('/soccerfields')
}))

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