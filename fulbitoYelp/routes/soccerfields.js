const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const SoccerField = require('../models/soccerField')
const { soccerfieldSchema } = require('../schemas.js')

const validateSoccerfield = (req, res, next) => {
    const { error } = soccerfieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield });
}))

router.get('/new', (req, res) => {
    res.render('soccerfields/new')
})

router.post('/', validateSoccerfield, catchAsync(async (req, res) => {
        // if(!req.body.soccerfield) throw new ExpressError('Información inválida', 400)
        const soccerfield = new SoccerField(req.body.soccerfield);
        await soccerfield.save();
        res.redirect(`/soccerfields/${soccerfield._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id).populate('reviews');
    res.render('soccerfields/show', { soccerfield })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/edit', { soccerfield });
}))

router.put('/:id', validateSoccerfield, catchAsync(async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield }, { new: true })
    res.redirect(`/soccerfields/${soccerfield.id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    res.redirect('/soccerfields')
}))

module.exports = router;