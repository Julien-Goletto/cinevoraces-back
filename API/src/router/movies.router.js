const express = require('express');
const moviesController = require('../controllers/movies.controller');

// Configuration du subRouter
const moviesRouter = express.Router();

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const getTokens = require('../middlewares/getTokens');
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
   * @returns {Array} 200 - Array of all movies
   * @returns {APIError} 404 - Aucun film n'est enregistré en base
   */
  .get('/', routerWrapper(moviesController.getAllMovies))
  /**
   * Get the last movie
   * @route Get /v1/movies/lastmovie
   * @group - Movies
   * @returns {Movie} 200 - Movie Object
   * @returns {APIError} 404 - Aucun film n'a été publié.
   */
  .get('/lastmovie', routerWrapper(moviesController.getAllMoviesFromLastSeason))
  /**
   * Get all movie from last season
   * @route Get /v1/movies/lastseason
   * @group - Movies
   * @returns {Array} 200 - Movie objects
   * @returns {APIError} 404 - Il n'y a pas de film dans la dernière saison.
   */
  .get('/lastseason', routerWrapper(moviesController.getAllMoviesFromLastSeason))
  /**
   * Get a detailled movie object saved in database via its id
   * @route Get /v1/movies/:movieId
   * @group - Movies
   * @param {Integer} movieId
   * @returns {Movie} 200 - movie object
   * @returns {APIError} 404 - Ce film n'est pas enregistré en base, ou pas encore publié
   */
  .get('/:movieId', routerWrapper(moviesController.getMovieByID))
  /**
   * Get all movie by season
   * @route Get /v1/movies/season/:seasonId
   * @group - Movies
   * @param {Integer} seasonId
   * @returns {Array} 200 - Movie objects
   * @returns {APIError} 404 - Il n'y a pas de film publié dans cette saison.
   */
  .get('/season/:seasonId', routerWrapper(moviesController.getAllMoviesBySeason))
  /**
  * Post a movie to database, on frontend request
   * @route POST v1/movies/newmovie/
   * @group - Movies
   * @param {NewMovie.model} NewMovie.body.required - correspond to movie Id
   * @returns {Movie} 201 - Film ajouté en base
   * @returns {APIError} 400 - Le film n'a pas pu être enregistré. Peut-être est-il déjà présent ?
   */
  .post(
    '/newmovie/',
    getTokens.getAccessToken,
    checkingUser.checkLogStatus,
    validate('body', movieSchema, genreSchema, languageSchema, countrySchema, seasonSchema),
    routerWrapper(moviesController.addNewMovie),
  )
  /**
  * Update some datas from a posted movie, on frontend request
   * @route PUT v1/movies/modify/:movieId
   * @group - Movies
   * @param {Integer} movieId.required - movieId
   * @param {MovieToUpdate.model} MovieToUpdate.body.required - correspond to movie Id
   * @returns {String} 201 - Les données du film ont été modifiées.
   * @returns {APIError} 400 - Le film n'a pas pu être modifié.
   */
  .put(
    '/modify/:movieId',
    getTokens.getAccessToken,
    checkingUser.checkAuthorization,
    validate('body', movieUpdateSchema),
    routerWrapper(moviesController.updateMovie),
  )
  /**
  * Delete a movie, on frontend request
   * @route DELETE v1/movies/:movieId
   * @param {Integer} movieId.required - french_title
   * @group - Movies
   * @returns {String} 200 - Le film a bien été supprimé.
   * @returns {APIError} 404 - Le film demandé n'existe pas en base.
   */
  .delete(
    '/:movieId',
    getTokens.getAccessToken,
    checkingUser.checkAuthorization,
    routerWrapper(moviesController.deleteMovie),
  )
  /**
  * Update movie, to publish it
   * @route PUT v1/movies/publishing/:movieId
   * @group - Movies
   * @param {Integer} movieId.required - movieId
   * @param {MovieToPublish.model} MovieToPublish.body.required - correspond to movie Id
   * @returns {String} 201 - Le film est publié.
   * @returns {APIError} 400 - Le film demandé n'existe pas en base.
   */
  .put(
    '/publishing/:movieId',
    getTokens.getAccessToken,
    checkingUser.checkAuthorization,
    routerWrapper(moviesController.publishMovie),
  );

moviesRouter.use(handleError);
/**
 * @typedef NewMovie
 * @property {string} french_title - french title
 * @property {string} original_title - originaltitle
 * @property {string} poster_url - poster hosted on TMDB
 * @property {Array} directors - directors list (strings)
 * @property {string} release_date - release date (date)
 * @property {integer} runtime - runtime
 * @property {Array} casting - five first actors from movie cast (strings)
 * @property {string} presentation - user presentation
 * @property {string} publishing_date - publishing date of the movie on Cinévoraces (date)
 * @property {integer} user_id - user id
 * @property {integer} season_id - season id
 * @property {Array} movie_genres - Array of movie genres (strings)
 * @property {Array} movie_languages - Array of movie languages (strings)
 * @property {Array} movie_countries - Array of movie Countries (strings)
 */
/**
 * @typedef MovieToUpdate
 * @property {string} french_title - french title
 * @property {string} original_title - originaltitle
 * @property {string} poster_url - poster hosted on TMDB
 * @property {Array} directors - directors list (strings)
 * @property {string} release_date - release date (date)
 * @property {integer} runtime - runtime
 * @property {Array} casting - five first actors from movie cast (strings)
 * @property {string} presentation - user presentation
 * @property {string} publishing_date - publishing date of the movie on Cinévoraces (date)
 */
/**
 * @typedef MovieToPublish
 * @property {string} is_published - french title
 */

module.exports = moviesRouter;
