const debug = require('debug')('Router_Wrapper');

/**
 * Wrap any called controller method with a try catch pattern
 * @route GET /v1/routerWrapper
 * @group - Middlewares
 * @param {req} request
 * @param {res} response
 * @param {next} next
 * @returns {method} if no error
 * @throws {err} intercept the emitted error to pass it to the upper layer with the Error Handler.
 */
const routerWrapper = (method) => {
  return async (req, res, next) => {
    try{
      await method(req, res, next);
    }
    catch(err){
      debug('ERROR', err);
      next(err);
    }
  }
};

module.exports = routerWrapper;