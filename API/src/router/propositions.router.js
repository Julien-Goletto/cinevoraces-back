const express = require('express');
const propositionsController = require('../controllers/propositions.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Sanitizer
const cleaner = require('../middlewares/cleaner');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Configuration du subRouter
const propositionsRouter = express.Router();

propositionsRouter

  /**
   * Return all users propositions. Admin required.
   * @route GET /v1/propositions/
   * @group - Propositions
   * @returns {Array} 200 - Movies objects that are pending
   * @returns {APIError} 404 - Aucune proposition enregistrée en base.
   */
  .get('/', checkingUser.checkAuthorization, routerWrapper(propositionsController.pendingPropositions))
  /**
   * Return propositions related to a specific user. Login required.
   * @route GET /v1/propositions/:userId
   * @group - Propositions
   * @param {integer} userId - user id
   * @returns {Array} 200 - for asked user :
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 404 - Cet utilisateur n'a pas de proposition de film en attente.
   */
  .get('/:userId', checkingUser.checkLogStatus, routerWrapper(propositionsController.userPendingPropositionsById))
  /**
   * Get all available propositions slots
   * @route GET /v1/propositions/availableSlots/:userId
   * @group - Propositions
   * @param {integer} userId - user id
   * @returns {Array} 200 - next_propositions objects
   * @returns {APIError} 404 - fail response
   */
  .get('/availableSlots/:userId', checkingUser.checkLogStatus, routerWrapper(propositionsController.availablePropositionsSlots))
  /**
   * Book an available proposition slot.
   * @route PUT /v1/propositions/book/
   * @group - Propositions
   * @param {String} publishingDate.body.required - publishing date
   * @returns {String} 201 - Le créneau demandé a été réservé.
   * @returns {APIError} 400 - Le créneau demandé n'est pas disponible.
   */
  .put(
    '/book',
    cleaner,
    checkingUser.checkLogStatus,
    routerWrapper(propositionsController.bookPendingPropositionsSlot),
  )
  /**
   * Unbook an unavailable proposition slot. As admin only.
   * @route PUT /v1/propositions/unbook/
   * @group - Propositions
   * @param {String} publishingDate.body.required - publishing date
   * @returns {Array} 201 - Le créneau a été libéré.
   * @returns {APIError} 400 - Le créneau demandé n'a ps pu être libéré.
   */
  .put(
    '/unbook',
    cleaner,
    checkingUser.checkAuthorization,
    routerWrapper(propositionsController.unbookPendingPropositionsSlot),
  );

propositionsRouter.use(handleError);

module.exports = propositionsRouter;
