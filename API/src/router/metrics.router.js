const express = require('express');
const metricsController = require('../controllers/metrics.controller');

// Gestion des erreurs
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Configuration du subRouter
const metricsRouter = express.Router();

metricsRouter
  /**
   * Get general metrics from CinéVoraces
   * @route GET /v1/metrics
   * @group - Metrics
   * @returns {Array} 200 - seasons_count, movies_count & countries_count
   */
  .get('/', routerWrapper(metricsController.generalMetrics))
  /**
   * Return all users metrics. Login required.
   * @route GET /v1/metrics/all
   * @group - Metrics
   * @returns {Array} 200 - for each user :
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 404 - Aucun utilisateur enregistré.
   */
  .get('/all', checkingUser.checkLogStatus, routerWrapper(metricsController.allUsersMetrics))
  /**
   * Return metrics related to a specific user. Login required.
   * @route GET /v1/metrics/:userId
   * @group - Metrics
   * @param {integer} userId - user id
   * @returns {Array} 200 - for asked user
   * proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 404 - Cet utilisateur n'existe pas.
   */
  .get('/:userId', checkingUser.checkLogStatus, routerWrapper(metricsController.userMetricsById));

module.exports = metricsRouter;
