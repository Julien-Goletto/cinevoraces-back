const express = require('express');
const moviesController = require('../controllers/movies.controller');

// Configuration du subRouter 
const moviesRouter = express.Router();

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');
// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');
// Refresh access token
const refreshAccessToken = require('../middlewares/refreshAccessToken');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema } = require('../validation/schemas/');

moviesRouter
  /**
   * Get a list of all movies objects saved in database
   * @route Get /movies
   * @group - Movies
   * @returns {Array} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/', refreshAccessToken, checkingUser.checkAuthorization, routerWrapper(moviesController.getAllMovies))
  /**
   * Get a detailled movie object saved in database via its id
   * @route Get /movies/:movieId
   * @group - Movies
   * @param {Integer} movieId
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/:movieId', routerWrapper(moviesController.getMovieByID))
  /**
   * Get a movie,, getting all datas for adding it to database
   * @route POST /movies/newmovie/
   * @group - Movies
   * @param {Integer} movieId - movie Id
   * @param {String} MovieTitle - movvie Title
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/newmovie', refreshAccessToken, checkingUser.checkLogStatus, validate('body', moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema), routerWrapper(moviesController.postMovie))

moviesRouter.use(handleError);

module.exports = moviesRouter;