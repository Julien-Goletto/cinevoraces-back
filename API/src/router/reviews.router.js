const express = require('express');
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

const reviewsRouter = express.Router();

const reviewsController = require('../controllers/reviews.controller');
/**
 * Get all reviews infos from one movie
 * (user id, movie id, user pseudo, user rating, user publish, comment, and avatar url)
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:movieId', routerWrapper(reviewsController.getAllReviews));

reviewsRouter.use(handleError);

module.exports = reviewsRouter;
