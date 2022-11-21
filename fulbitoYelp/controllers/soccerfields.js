const SoccerField = require('../models/soccerField')

module.exports.index = async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield } );
}

module.exports.renderNewForm = (req, res) => {
    res.render('soccerfields/new')
}

module.exports.createSoccerfield = async (req, res) => {
    const soccerfield = new SoccerField(req.body.soccerfield);
    soccerfield.images = req.files.map(f => ({ url: f.path, filename: f.filename}))
    soccerfield.author = req.user._id;
    await soccerfield.save();
    req.flash('success', 'Se creó una nueva cancha');
    res.redirect(`/soccerfields/${soccerfield._id}`)
}

module.exports.showSoccerfield = async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!soccerfield) {
        req.flash = ('error', 'No se encontró la cancha')
        return res.redirect('/soccerfields')
    }
    res.render('soccerfields/show', { soccerfield })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findById(id);
    if (!soccerfield){
        req.flash('error', 'No se encontró la cancha');
        return res.redirect('/soccerfields')
    }
    res.render('soccerfields/edit', { soccerfield });
}

module.exports.updateSoccerfield = async (req, res) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findByIdAndUpdate(id, { ...req.body.soccerfield }, { new: true })
    req.flash('success', 'Se actualizó la cancha');
    res.redirect(`/soccerfields/${soccerfield.id}`)
}

module.exports.deleteSoccerfield = async (req, res) => {
    const { id } = req.params;
    await SoccerField.findByIdAndDelete(id)
    req.flash('success', 'Se borró la cancha');
    res.redirect('/soccerfields')
}