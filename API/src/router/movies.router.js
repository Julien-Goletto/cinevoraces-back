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
const {
  moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema,
} = require('../validation/schemas');

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
   * Get all movie by season
   * @route Get /v1/movies/season/:seasonId
   * @group - Movies
   * @param {Integer} seasonId
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/season/:seasonId', routerWrapper(moviesController.getAllMoviesBySeason))
  /**
  * Post a movie to database, on frontend request
   * @route POST /movies/newmovie/
   * @group - Movies
   * @param {NewMovie.model} NewMovie.body.required - correspond to movie Id
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post(
    '/newmovie/',
    checkingUser.checkLogStatus,
    validate('body', moviesSchema, genreSchema, languageSchema, countrySchema, seasonSchema),
    routerWrapper(moviesController.postMovie),
  );
/**
 * @typedef NewMovie
 * @property {string} frenchTitle - french title
 * @property {string} originalTitle - originaltitle
 * @property {string} posterUrl - poster hosted on TMDB
 * @property {Array} directors - directors list (strings)
 * @property {string} releaseDate - release date (date)
 * @property {integer} runtime - runtime
 * @property {Array} casting - five first actors from movie cast (strings)
 * @property {string} presentation - user presentation
 * @property {string} publishingDate - publishing date of the movie on Cinévoraces (date)
 * @property {integer} userId - user id
 * @property {integer} seasonId - season id
 * @property {Array} movieGenres - Array of movie genres (strings)
 * @property {Array} movieLanguages - Array of movie languages (strings)
 * @property {Array} movieCountries - Array of movie Countries (strings)
 */

moviesRouter.use(handleError);

module.exports = moviesRouter;
