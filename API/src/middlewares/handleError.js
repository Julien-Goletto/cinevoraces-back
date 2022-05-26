/* eslint-disable no-unused-vars */
const APIError = require('../Errors/APIError');

/**
   * Display error on terminal, then convert it into APIError instance (if it's not),
   * to be logged soon after and saved into log files and returned
   * To be used by individual routers, at the end of programmed routes
   * @route GET /v1/handleError
   * @group Middlewares
   * @param {req} request
   * @param {res} response
   * @returns {APIError} in JSON format
   */
const handleError = async (err, req, res, next) => {
  let myError;
  if (err instanceof APIError) {
    myError = err;
  } else {
    myError = new APIError(err, req.url);
  }
  await myError.log();
  res.status(myError.status).json({ error: myError.message });
};

module.exports = handleError;
