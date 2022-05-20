const express = require('express');
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');
const checkingUser = require('../middlewares/checkingUser');

const reviewsRouter = express.Router();

const reviewsController = require('../controllers/reviews.controller');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const reviewSchema = require('../validation/schemas/review.schema');

/**
 * Get all comments from one movie with:
 * (users ids, movie id, users pseudos, users ratings,
 * users publish, users comments, and users avatar url)
 * @route GET /v1/reviews/:movieId/comments
 * @group - Reviews
 * @param {Integer} movieId
 * @returns {Array} 200 - Reviews if exists, else nothing
 */
reviewsRouter.get('/:movieId/comments', routerWrapper(reviewsController.getAllComments));
/**
 * Get user reviews:
 * (id, movie id, pseudo, bookmarked, viewed, liked, rating, comment)
 * @route GET /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200 - requested review
 * @returns {APIError} 401 - Vous n'avez pas la permission de visualiser cette review.
 */
reviewsRouter.get('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.getUserReview));
/**
 * Create review on movie avec tout les booleans sur false et la note et le comment sur null
 * @route POST /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 201 - Review crée.
 * @returns {APIError} 401 - Vous n'avez pas la permission de créer une review.
 */
reviewsRouter.post('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.createReview));
/**
 * Update review on movie
 * @route PUT /v1/reviews/:userId/:movieId/
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @param {reviewUpdate.model} reviewUpdate.body.required
 * @returns {reviews} 201 - Review modifiée.
 * @returns {APIError} 401 - Vous n'avez pas la permission de modifier cette review.
 */
reviewsRouter.put('/:userId/:movieId', checkingUser.checkLogStatus, validate('body', reviewSchema), routerWrapper(reviewsController.updateReview));
/**
 * Delete comment on movie
 * @route DELETE /v1/reviews/:userId/:movieId/comment
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200 - Commentaire supprimé
 * @returns {APIError} 401 - Vous n'avez pas la permission de supprimer ce commentaire.
 */
reviewsRouter.delete('/:userId/:movieId/comment', checkingUser.checkLogStatus, routerWrapper(reviewsController.deleteComment));
/**
 * Delete review on movie
 * @route DELETE /v1/reviews/:userId/:movieId
 * @group - Reviews
 * @param {Integer} userId
 * @param {Integer} movieId
 * @returns {reviews} 200 - Review supprimée.
 * @returns {APIError} 401 - Vous n'avez pas la permission de supprimer cette Review.
 */
reviewsRouter.delete('/:userId/:movieId', checkingUser.checkLogStatus, routerWrapper(reviewsController.deleteReview));

reviewsRouter.use(handleError);

/**
 * @typedef reviewUpdate
 * @property {Boolean} bookmarked
 * @property {Boolean} viewed
 * @property {Boolean} liked
 * @property {Integer} rating
 * @property {String} comment
 */

module.exports = reviewsRouter;
