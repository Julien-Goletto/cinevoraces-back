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
   * Get all available propositions slots
   * @route GET /v1/propositions/availableSlots/:userId
   * @group - propositions
   * @param {integer} userId - user id
   * @returns {Array} 200 - success response - next_propositions
   * @returns {APIError} 404 - fail response
   */
  .get('/availableSlots/:userId', checkingUser.checkLogStatus, routerWrapper(propositionsController.availablePropositionsSlots))
  /**
   * Book an available proposition slot.
   * @route PUT /v1/propositions/book/
   * @group - propositions
   * @param {Date} publishingDate - publishing date
   * @returns {String} 201 - success response - Le créneau demandé a été réservé.
   * @returns {APIError} 401 - Le créneau n'a pas pu être réservé.
   */
  .put(
    '/book/:publishingDate',
    checkingUser.checkLogStatus,
    routerWrapper(propositionsController.bookPendingPropositionsSlot),
  )
  /**
   * Unbook an unavailable proposition slot. As admin only.
   * @route PUT /v1/propositions/unbook/
   * @group - propositions
   * @param {Date} publishingDate - publishing date
   * @returns {Array} 201 - success response - Le créneau n'a pas pu être libéré.
   * @returns {APIError} 401 - Le créneau demandé a été libéré.
   */
  .put(
    '/unbook/:publishingDate',
    checkingUser.checkAuthorization,
    routerWrapper(propositionsController.unbookPendingPropositionsSlot),
  );

propositionsRouter.use(handleError);

module.exports = propositionsRouter;
