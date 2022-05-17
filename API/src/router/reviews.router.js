const express = require('express');
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');
const checkingUser = require('../middlewares/checkingUser');

const reviewsRouter = express.Router();

const reviewsController = require('../controllers/reviews.controller');

/**
 * Get all comments from one movie with:
 * (users ids, movie id, users pseudos, users ratings,
 * users publish, users comments, and users avatar url)
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:movieId', routerWrapper(reviewsController.getAllComments));
/**
 * Get user reviews:
 * (id, movie id, pseudo, bookmarked, viewed, liked, rating, comment)
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.getUserReview));
/**
 * Add a comment on movie
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.post('/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.addComment));

reviewsRouter.use(handleError);

module.exports = reviewsRouter;
