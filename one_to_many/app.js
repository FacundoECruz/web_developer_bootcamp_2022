const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const engine = require('ejs-mate')
const College = require('./models/College')
const Course = require('./models/Course')

mongoose.connect('mongodb://localhost:27017/college', {
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

//COLLEGES ROUTES

app.get('/colleges', async (req, res) => {
    const colleges = await College.find({}) 
    res.render('colleges/index', { colleges })
})

app.get('/colleges/new', (req, res) => {
    res.render('colleges/new')
})

app.post('/colleges', async (req, res) => {
    const college = new College(req.body.college)
    await college.save()
    res.redirect('/colleges')
})

app.get('/colleges/:id', async (req, res) => {
    const { id } = req.params
    const college = await College.findById(id).populate('courses')
    res.render('colleges/show', { college })
})

app.delete('/colleges/:id', async (req, res) => {
    const college = await College.findByIdAndDelete(req.params.id)
    res.redirect('/colleges')
})

//COURSES ROUTES
app.get('/courses', (req, res) => {
    res.render('courses/index')
})

app.get('/colleges/:id/courses/new', async (req, res) => {
    const { id } = req.params
    const college = await College.findById(id)
    res.render('courses/new', { id, college })
})

app.post('/colleges/:id/courses', async (req, res) => {
    const { name, teacher, weeks } = req.body.course
    const course = new Course({ name, teacher, weeks })
    const { id } = req.params
    const college = await College.findById(id)
    college.courses.push(course)
    course.college = college
    await college.save()
    await course.save()
    res.redirect(`/colleges/${id}`)
})

app.get('/courses/:id', async (req, res) => {
    const { id } = req.params
    const course = await Course.findById(id).populate('college', 'name')
    res.render('courses/show', { course })
})

app.delete('/courses/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    res.redirect('/colleges')
})

app.all('*', (req, res) => {
    res.send('404 NOT FOUND')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})