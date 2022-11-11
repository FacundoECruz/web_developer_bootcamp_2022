const { soccerfieldSchema, reviewSchema } = require('./schemas.js')  
const ExpressError = require('./utils/ExpressError')
const SoccerField = require('./models/soccerField')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Tenes que registrarte para realizar esta acción')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateSoccerfield = (req, res, next) => {
    const { error } = soccerfieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const soccerfield = await SoccerField.findById(id);
    if(!soccerfield.author.equals(req.user._id)) {
        req.flash('error', 'No tenés permiso para hacer esto');
        return res.redirect(`/soccerfields/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}