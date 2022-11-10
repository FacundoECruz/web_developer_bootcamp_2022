module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Tenes que registrarte para realizar esta acción')
        return res.redirect('/login')
    }
    next();
}