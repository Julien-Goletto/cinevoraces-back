const express = require('express');
const moviesController = require('../controllers/movies.controller');

// Configuration du subRouter 
const moviesRouter = express.Router();

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema } = require('../validation/schemas/');

moviesRouter
  /**
   * Get a list of all movies objects saved in database
   * @route Get /v1/movies
   * @group - Movies
   * @returns {Array} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/', routerWrapper(moviesController.getAllMovies))
  /**
   * Get a detailled movie object saved in database via its id
   * @route Get /v1/movies/:movieId
   * @group - Movies
   * @param {Integer} movieId
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/:movieId', routerWrapper(moviesController.getMovieByID))
  /**
   * Get a game from RAWG services, getting all datas, before adding it to database with next post method
   * @route POST /v1/movies/newmovie/
   * @group - Movies
   * @param {Integer} movieId - correspond to movie Id
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/newmovie/', checkingUser.checkLogStatus, validate('body', moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema), routerWrapper(moviesController.postMovie))

moviesRouter.use(handleError);

module.exports = moviesRouter;