const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const SoccerField = require('../models/soccerField')
const { soccerfieldSchema } = require('../schemas.js')
const { isLoggedIn } = require('../middleware')

const validateSoccerfield = (req, res, next) => {
    const { error } = soccerfieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findById(id);
    if(!soccerfield.author.equals(req.user._id)) {
        req.flash('error', 'No tenés permiso para hacer esto');
        return res.redirect(`/soccerfields/${id}`);
    }
    next();
}

router.get('/', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield } );
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('soccerfields/new')
})

router.post('/', isLoggedIn, validateSoccerfield, catchAsync(async (req, res) => {
        const soccerfield = new SoccerField(req.body.soccerfield);
        soccerfield.author = req.user._id;
        await soccerfield.save();
        req.flash('success', 'Se creó una nueva cancha');
        res.redirect(`/soccerfields/${soccerfield._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id).populate('reviews').populate('author');
    if (!soccerfield) {
        req.flash = ('error', 'No se encontró la cancha')
        return res.redirect('/soccerfields')
    }
    res.render('soccerfields/show', { soccerfield })
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findById(id);
    if (!soccerfield){
        req.flash('error', 'No se encontró la cancha');
        return res.redirect('/soccerfields')
    }
    res.render('soccerfields/edit', { soccerfield });
}))

router.put('/:id', isLoggedIn, isAuthor, validateSoccerfield, catchAsync(async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield }, { new: true })
    req.flash('success', 'Se actualizó la cancha');
    res.redirect(`/soccerfields/${soccerfield.id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    req.flash('success', 'Se borró la cancha');
    res.redirect('/soccerfields')
}))

module.exports = router;