const express = require('express');
const refreshTokensController = require('../controllers/refreshTokens.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Configuration du subRouter
const refreshTokensRouter = express.Router();

refreshTokensRouter
  /**
   * Renew and send into cookies new access and refresh tokens
   * @route GET /v1/refreshTokens
   * @group - Metrics
   * @returns {Array} 200 - success response
   * access and refresh token renewed and sent into cookies
   */
  .get('/', routerWrapper(refreshTokensController.refreshTokens));

refreshTokensRouter.use(handleError);

module.exports = refreshTokensRouter;
