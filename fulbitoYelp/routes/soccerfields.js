const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const soccerfields = require('../controllers/soccerfields')
const SoccerField = require('../models/soccerField')
const { isLoggedIn, isAuthor, validateSoccerfield } = require('../middleware')

router.get('/', catchAsync(soccerfields.index))

router.get('/new', isLoggedIn, soccerfields.renderNewForm)

router.post('/', isLoggedIn, validateSoccerfield, catchAsync(soccerfields.createSoccerfield))

router.get('/:id', catchAsync(soccerfields.showSoccerfield))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(soccerfields.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateSoccerfield, catchAsync(soccerfields.updateSoccerfield))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(soccerfields.deleteSoccerfield))

module.exports = router;