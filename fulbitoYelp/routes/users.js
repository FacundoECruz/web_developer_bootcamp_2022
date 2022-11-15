const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const user = require('../controllers/users') 

router.get('/register', user.renderRegister)

router.post('/register', catchAsync(user.register))

router.get('/login', user.renderLogin)

router.post('/login', passport.authenticate('local' , { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);

module.exports = router;