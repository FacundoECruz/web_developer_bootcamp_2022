const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const SoccerField = require('./models/soccerField')
const methodOverride = require('method-override')

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    res.render('home')
})

app.get('/soccerfields', async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield });
})

app.get('/soccerfields/new', (req, res) => {
    res.render('soccerfields/new')
})

app.post('/soccerfields', async (req, res) => {
    const soccerfield = new SoccerField(req.body.soccerfield);
    await soccerfield.save();
    res.redirect(`/soccerfields/${soccerfield._id}`)  
})

app.get('/soccerfields/:id', async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/show', { soccerfield })
})

app.get('/soccerfields/:id/edit', async (req,res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/edit', { soccerfield });
})

app.put('/soccerfields/:id', async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield}, { new: true })
    res.redirect(`/soccerfields/${ soccerfield.id }`)
})

app.delete('/soccerfields/:id', async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    res.redirect('/soccerfields')
})

app.listen(3000, () => {
    console.log('ON 3000')
})