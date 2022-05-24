const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

/**
   * Method collection relative to user status : connection and authorization
   * To be placed prefixing controller methods callings in routers
   * @route GET /v1/checkingUser
   * @group - Middlewares
   * @param {req} request
   * @param {next} next
   * @returns {next()} if tests pass
   * @throws {APIError} If connections status / authorization
   * aren't matched to perform the next action
   */
const checkingUser = {
  /**
   * Check the jwt in session to ensure it presents the correct format
   */
  checkLogStatus(req, _, next) {
    const { token } = req.session;
    if (!token) {
      throw new APIError('Vous devez être connecté pour poursuivre.', req.url, 401);
    }
    // Token storage in session
    req.session.token = token;
    // Then token verification
    let user;
    try {
      user = jwtMethods.decryptAccessToken(token);
    } catch (e) {
      throw new APIError('La vérification du contenu du refresh token a échouée.', req.url, 401);
    }
    if (jwtMethods.checkTokenContent(user)) {
      next();
    } else {
      throw new APIError('Vous devez être connecté pour poursuivre.', req.url, 401);
    }
  },
  checkAuthorization(req, _, next) {
    const { token } = req.session;
    if (!token) {
      throw new APIError('Vous devez être connecté pour poursuivre.', req.url, 401);
    }
    // Token storage in session
    req.session.token = token;
    // Then token verification
    let user;
    try {
      user = jwtMethods.decryptAccessToken(token);
    } catch (e) {
      throw new APIError('La vérification du contenu du refresh token a échouée.', req.url, 401);
    }
    if (jwtMethods.checkTokenAuthorization(user)) {
      next();
    } else {
      throw new APIError("Vous n'avez pas la permission de réaliser cette action.");
    }
  },
};

module.exports = checkingUser;
