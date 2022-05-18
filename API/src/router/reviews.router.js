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
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.get('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.getUserReview));
/**
 * Create comment on movie
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.post('/:userId/:movieId', checkingUser.checkLogStatus, validate('body', commentSchema), routerWrapper(reviewsController.createComment));
/**
 * Update comment on movie
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.put('/:userId/:movieId', checkingUser.checkLogStatus, validate('body', commentSchema), routerWrapper(reviewsController.updateComment));
/**
 * Delete comment on movie
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200- success response
 * @returns {APIError} 404 - fil response
 */
reviewsRouter.delete('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.deleteComment));

reviewsRouter.use(handleError);

module.exports = reviewsRouter;
