const express = require('express');
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');
const checkingUser = require('../middlewares/checkingUser');

const reviewsRouter = express.Router();

const reviewsController = require('../controllers/reviews.controller');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const commentSchema = require('../validation/schemas/comment.schema');

/**
 * Get all comments from one movie with:
 * (users ids, movie id, users pseudos, users ratings,
 * users publish, users comments, and users avatar url)
 * @route GET /v1/reviews/:movieId/comments
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:movieId/comments', routerWrapper(reviewsController.getAllComments));
/**
 * Get user reviews:
 * (id, movie id, pseudo, bookmarked, viewed, liked, rating, comment)
 * @route GET /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.getUserReview));
/**
 * Create review on movie
 * @route POST /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.post('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.createReview));
/**
 * Update comment on movie
 * @route PUT /v1/reviews/:userId/:movieId/comment
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.put('/:userId/:movieId/comment', checkingUser.checkLogStatus, validate('body', commentSchema), routerWrapper(reviewsController.updateComment));
/**
 * Update review on movie
 * @route PUT /v1/reviews/:userId/:movieId/review/UPDATEENCOURSNONFONCTIONELLE
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.put('/:userId/:movieId/review', checkingUser.checkLogStatus, routerWrapper(reviewsController.updateReview));
/**
 * Delete review on movie
 * @route DELETE /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.delete('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.deleteReview));

reviewsRouter.use(handleError);

module.exports = reviewsRouter;
