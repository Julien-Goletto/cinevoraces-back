const express = require('express');
const propositionsController = require('../controllers/propositions.controller');

// Gestion des erreurs
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const getTokens = require('../middlewares/getTokens');
const checkingUser = require('../middlewares/checkingUser');

// Configuration du subRouter
const propositionsRouter = express.Router();

propositionsRouter

  /**
   * Return all users propositions. Admin required.
   * @route GET /v1/propositions/pendingPropositions
   * @group - Propositions
   * @returns {Array} 200 - Movies objects that are pending
   * @returns {APIError} 404 - Aucune proposition enregistrée en base.
   */
  .get('/pendingPropositions', getTokens.getAccessToken, checkingUser.checkAuthorization, routerWrapper(propositionsController.pendingPropositions))
  /**
   * Get available slots among the next 10 slots
   * @route GET /v1/propositions/availableSlots
   * @group - Propositions
   * @returns {Array} 200 - for asked user :
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 404 - Cet utilisateur n'a pas de proposition de film en attente.
   */
  .get('/availableSlots', getTokens.getAccessToken, checkingUser.checkLogStatus, routerWrapper(propositionsController.availablePropositionsSlots))
  /**
   * Get the pending proposition for one user
   * @route PUT /v1/propositions/:userId
   * @group - Propositions
   * @param {Date} publishingDate - publishing date
   * @returns {String} 201 - success response - Le créneau demandé a été réservé.
   * @returns {APIError} 401 - Le créneau n'a pas pu être réservé.
   */
  .get('/:userId', getTokens.getAccessToken, checkingUser.checkLogStatus, routerWrapper(propositionsController.userPendingPropositionsById))
  /**
   * Check if the user has an already existing proposition
   * @route GET /v1/propositions/hasPendingProposition/:userId
   * @group - Propositions
   * @param {integer} userId - user id
   * @returns {boolean} 200 - { hasAPendingProposition: false }
   * @returns {APIError} 400 - Vous avez déjà une proposition en attente.
   * Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.
   */
  .get('/hasPendingProposition/:userId', getTokens.getAccessToken, checkingUser.checkLogStatus, routerWrapper(propositionsController.hasAPendingProposition))
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
    getTokens.getAccessToken,
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
    getTokens.getAccessToken,
    checkingUser.checkAuthorization,
    routerWrapper(propositionsController.unbookPendingPropositionsSlot),
  );

module.exports = propositionsRouter;
