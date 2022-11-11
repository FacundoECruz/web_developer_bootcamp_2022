const express = require('express')
const router = express.Router({mergeParams: true})
const { validateReview } = require('../middleware')
const SoccerField = require('../models/soccerField')
const Review = require('../models/review')

const catchAsync = require('../utils/catchAsync')

router.post('/', validateReview, catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id)
    const review = new Review(req.body.review)
    soccerfield.reviews.push(review)
    await review.save()
    await soccerfield.save()
    req.flash('success', 'Se agregó el comentario');
    res.redirect(`/soccerfields/${soccerfield._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await SoccerField.findByIdAndUpdate(id, { $pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Se borró el comentario');
    res.redirect(`/soccerfields/${id}`)
}))

module.exports = router;