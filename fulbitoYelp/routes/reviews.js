const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const SoccerField = require('../models/soccerField')
const Review = require('../models/review')
const { reviewSchema } = require('../schemas.js')

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/soccerfields/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id)
    const review = new Review(req.body.review)
    soccerfield.reviews.push(review)
    await review.save()
    await soccerfield.save()
    res.redirect(`/soccerfields/${soccerfield._id}`)
}))

router.delete('/soccerfields/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await SoccerField.findByIdAndUpdate(id, { $pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/soccerfields/${id}`)
}))