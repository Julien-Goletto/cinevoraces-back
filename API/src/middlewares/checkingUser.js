const debug = require('debug')('Check_User');
const APIError = require('../Errors/APIError');

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
  checkLogStatus(req,_,next){
    if(req.session.user){
      next();
    }
    else {
      throw new APIError("To continue, you must be logged in.");
    };
  },
  checkAutorization(req,_,next){
    if(req.session.user.isAdmin){
      next();
    }
    else {
      throw new APIError("You doesn't have the authorization for this action.");
    };
  },
};

module.exports = checkingUser;