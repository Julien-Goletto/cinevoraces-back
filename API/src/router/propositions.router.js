const express = require('express');
const propositionsController = require('../controllers/propositions.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Configuration du subRouter
const propositionsRouter = express.Router();

propositionsRouter
  /**
   * Get all available propositions slots
   * @route GET /v1/propositions/availableSlots
   * @group - propositions
   * @returns {Array} 200 - success response - next_propositions
   * @returns {APIError} 404 - fail response
   */
  .get('/availableSlots', checkingUser.checkLogStatus, routerWrapper(propositionsController.availablePropositionsSlots))
  /**
   * Return all users propositions. Admin required.
   * @route GET /v1/propositions/pendingPropositions
   * @group - propositions
   * @returns {Array} 200 - success response - movies that are pending
   * @returns {APIError} 404 - fail response
   */
  .get('/', checkingUser.checkAuthorization, routerWrapper(propositionsController.pendingPropositions))
  /**
   * Return propositions related to a specific user. Login required.
   * @route GET /v1/propositions/:userId
   * @group - propositions
   * @param {integer} userId - user id
   * @returns {Array} 200 - success response - for asked user :
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 401 - fail response
   */
  .get('/:userId', checkingUser.checkLogStatus, routerWrapper(propositionsController.userPendingPropositionsById))
  /**
   * Book an available proposition slot.
   * @route GET /v1/propositions/book/:publishingDate
   * @group - propositions
   * @param {Date} publishingDate - publishing date
   * @returns {Array} 201 - success response - for asked user :
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 401 - fail response
   */
  .put(
    '/book/:publishingDate',
    checkingUser.checkLogStatus,
    routerWrapper(propositionsController.bookPendingPropositionsSlot),
  );

propositionsRouter.use(handleError);

module.exports = propositionsRouter;
