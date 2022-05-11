const debug = require('debug')('Check_User');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');
const usersController = require('../controllers/users.controller');

  /**
   * Method collection relative to user status : connection and authorization
   * To be placed prefixing controller methods callings in routers
   * @route GET /v1/checkingUser
   * @group - Middlewares
   * @param {req} request
   * @param {next} next
   * @returns {next()} if tests pass
   * @throws {APIError} If connections status / authorization aren't matched to perform the next action
   */
const checkingUser = {
  /**
   * Check the jwt in session to ensure it presents the correct format
   */
  checkLogStatus(req,_,next){
    const accessToken = jwtMethods.decryptRefreshToken(
      jwtMethods.cookieFinder(
        jwtMethods.cookieParser(req.headers.cookie),'refreshToken'
      )
    );
    if(jwtMethods.checkTokenContent(accessToken)){
      next();
    }
    else {
      throw new APIError("To continue, you must be logged in.");
    };
  },
  checkAuthorization(req,_,next){
    const accessToken = jwtMethods.decryptRefreshToken(
      jwtMethods.cookieFinder(
        jwtMethods.cookieParser(req.headers.cookie),'refreshToken'
      )
    );
    if(jwtMethods.checkTokenAuthorization(accessToken)){
      next();
    }
    else {
      throw new APIError("You doesn't have the authorization for this action.");
    };
  },
};

module.exports = checkingUser;