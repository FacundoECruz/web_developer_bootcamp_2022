const SoccerField = require('../models/soccerField')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const soccerfield = await SoccerField.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id;
    soccerfield.reviews.unshift(review)
    await review.save()
   await soccerfield.save()
    req.flash('success', 'Se agregó el comentario');
    res.redirect(`/soccerfields/${soccerfield._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await SoccerField.findByIdAndUpdate(id, { $pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Se borró el comentario');
    res.redirect(`/soccerfields/${id}`)
}