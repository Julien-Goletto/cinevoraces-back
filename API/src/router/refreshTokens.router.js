const express = require('express');
const refreshTokensController = require('../controllers/refreshTokens.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Configuration du subRouter
const refreshTokensRouter = express.Router();

refreshTokensRouter
  /**
   * Renew and send into cookies new access and refresh tokens, and userId in json
   * @route GET /v1/refreshTokens
   * @group - Refresh Token
   * @param {refreshToken} refreshToken
   * @returns {User} 200 - user object & access and refresh token renewed and sent into cookies.
   * @returns {APIError} 401 - Vous devez être connecté pour poursuivre.
   * @returns {User} 404 - Ce compte utilisateur a été supprimé ou n'existe pas.
   */
  .get('/', routerWrapper(refreshTokensController.refreshTokens));

refreshTokensRouter.use(handleError);

module.exports = refreshTokensRouter;
