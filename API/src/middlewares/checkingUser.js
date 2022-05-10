const debug = require('debug')('Check_User');
const APIError = require('../Errors/APIError');
const { refreshAccessToken } = require('../JWT/jwt.module');
const jwtMethods = require('../JWT/jwt.module');

  /**
   * Method collection relative to user status : connection and authorization
   * To be placed prefixing controller methods callings in routers
   * @route GET /v1/checkingUser
   * @group - Middlewares
   * @param {req} request
   * @param {res} response
   * @param {next} next
   * @returns {next()} if tests pass
   * @throws {APIError} If connections status / authorization aren't matched to perform the next action
   */
const checkingUser ={
  /**
   * Check the jwt in session to ensure it presents the correct format
   */
  checkLogStatus(req,_,next){
    const cookies = jwtMethods.cookieParser(req.headers.cookie);
    if(jwtMethods.checkTokenContent(token)){
      next();
    }
    else {
      throw new APIError("To continue, you must be logged in.");
    };
  },
  checkAuthorization(req,res,next){
    const accessToken = jwtMethods.refreshAccessToken(req.headers.cookie);
    debug(jwtMethods.decryptAccessToken(jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie),'accessToken')));
    res.cookie('accessToken', accessToken);
    debug(res.cookie);
    next();
    // const token = jwtMethods.decryptAccessToken(req.session.accessToken);
    // if(jwtMethods.checkTokenAuthorization(token)){
    //   next();
    // }
    // else {
    //   throw new APIError("You doesn't have the authorization for this action.");
    // };
  },
};

module.exports = checkingUser;