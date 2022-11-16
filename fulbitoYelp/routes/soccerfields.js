const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const soccerfields = require('../controllers/soccerfields')
const { isLoggedIn, isAuthor, validateSoccerfield } = require('../middleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route('/')
    .get(catchAsync(soccerfields.index))
    // .post(isLoggedIn, validateSoccerfield, catchAsync(soccerfields.createSoccerfield))
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.file)
        res.send("It worked!")
    })
router.get('/new', isLoggedIn, soccerfields.renderNewForm)

router.route('/:id')
    .get(catchAsync(soccerfields.showSoccerfield))
    .put(isLoggedIn, isAuthor, validateSoccerfield, catchAsync(soccerfields.updateSoccerfield))
    .delete(isLoggedIn, isAuthor, catchAsync(soccerfields.deleteSoccerfield))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(soccerfields.renderEditForm))

module.exports = router;