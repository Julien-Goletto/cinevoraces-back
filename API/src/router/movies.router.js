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
  movieSchema, movieUpdateSchema, genreSchema, languageSchema, countrySchema, seasonSchema,
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
   * Get the last movie
   * @route Get /v1/movies/lastmovie
   * @group - Movies
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/lastmovie', routerWrapper(moviesController.getAllMoviesFromLastSeason))
  /**
   * Get all movie from last season
   * @route Get /v1/movies/lastseason
   * @group - Movies
   * @returns {Movie} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/lastseason', routerWrapper(moviesController.getAllMoviesFromLastSeason))
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
   * @returns {Movie} 201 - success response
   * @returns {APIError} 404 - fail response
   */
  .post(
    '/newmovie/',
    checkingUser.checkLogStatus,
    validate('body', movieSchema, genreSchema, languageSchema, countrySchema, seasonSchema),
    routerWrapper(moviesController.addNewMovie),
  )
  /**
  * Update some datas from a posted movie, on frontend request
   * @route PUT /movies/:movieTitle
   * @group - Movies
   * @param {String} movieTitle.required - french_title
   * @param {MovieToUpdate.model} MovieToUpdate.body.required - correspond to movie Id
   * @returns {String} 201 - Les données du film ont été modifiées.
   * @returns {APIError} 404 - Le film n'a pas pu être modifié.
   */
  .put(
    '/modify/:movieTitle',
    checkingUser.checkAuthorization,
    validate('body', movieUpdateSchema),
    routerWrapper(moviesController.deleteMovie),
  )
  /**
  * Delete a movie, on frontend request
   * @route DELETE /movies/:movieTitle
   * @group - Movies
   * @param {String} movieTitle.required - french_title
   * @returns {String} 200 - Le film a bien été supprimé.
   * @returns {APIError} 404 - Le film demandé nexiste pas en base.
   */
  .delete(
    '/:movieTitle',
    checkingUser.checkAuthorization,
    routerWrapper(moviesController.deleteMovie),
  );

moviesRouter.use(handleError);
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
/**
 * @typedef MovieToUpdate
 * @property {string} frenchTitle - french title
 * @property {string} originalTitle - originaltitle
 * @property {string} posterUrl - poster hosted on TMDB
 * @property {Array} directors - directors list (strings)
 * @property {string} releaseDate - release date (date)
 * @property {integer} runtime - runtime
 * @property {Array} casting - five first actors from movie cast (strings)
 * @property {string} presentation - user presentation
 * @property {string} publishingDate - publishing date of the movie on Cinévoraces (date)
 */

module.exports = moviesRouter;
