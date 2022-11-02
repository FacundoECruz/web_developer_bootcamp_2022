const express = require('express')
const router = express.Router()

router.get('/soccerfields', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield });
}))

router.get('/soccerfields/new', (req, res) => {
    res.render('soccerfields/new')
})

router.post('/soccerfields', validateSoccerfield, catchAsync(async (req, res) => {
        // if(!req.body.soccerfield) throw new ExpressError('Información inválida', 400)
        const soccerfield = new SoccerField(req.body.soccerfield);
        await soccerfield.save();
        res.redirect(`/soccerfields/${soccerfield._id}`)
}))

router.get('/soccerfields/:id', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id).populate('reviews');
    res.render('soccerfields/show', { soccerfield })
}))

router.get('/soccerfields/:id/edit', catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id);
    res.render('soccerfields/edit', { soccerfield });
}))

router.put('/soccerfields/:id', validateSoccerfield, catchAsync(async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield }, { new: true })
    res.redirect(`/soccerfields/${soccerfield.id}`)
}))

router.delete('/soccerfields/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    res.redirect('/soccerfields')
}))

module.exports = router;