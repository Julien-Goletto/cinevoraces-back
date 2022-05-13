const express = require('express');
const metricsController = require('../controllers/metrics.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
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
   * @returns {Array} 200 - success response - seasons_count, movies_count & countries_count
   */
  .get('/', routerWrapper(metricsController.generalMetrics))
    /**
   * Return all users metrics. Login required.
   * @route GET /v1/metrics/all
   * @group - Metrics
   * @returns {Array} 200 - success response - for each user : proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 401 - fail response
   */
  .get('/all', routerWrapper(metricsController.allUsersMetrics))
    /**
   * Return metrics related to a specific user. Login required.
   * @route GET /v1/metrics/:userId
   * @group - Metrics
   * @param {integer} userId - user id
   * @returns {Array} 200 - success response - for asked user : proposed_movies_count, comments_counts, likes_count, watchlist_count & ratings_count
   * @returns {APIError} 401 - fail response
   */
  .get('/:userId', routerWrapper(metricsController.userMetricsById));

metricsRouter.use(handleError);

module.exports = metricsRouter;