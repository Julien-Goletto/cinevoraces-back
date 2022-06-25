const express = require('express');
const moviesController = require('../controllers/movies.controller');

// Configuration du subRouter
const moviesRouter = express.Router();

// Gestion des erreurs
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
   * Get a list of movies objects, corresponding to passed filters.
   * If no filter is used, returns all movies in view movies_infos.
   * Filters options are (with examples) :
   *  - For invited users :
   *    - season_number=3
   *    - genres=Comédie|Drame|Thriller (string concatenation with pipes)
   *    - countries=Japan|United+States+of+America|France (string concat with pipes, + for spaces)
   *    - runtime=h120 ( high value prefixed with h)
   *    - release_date=l1954|h2018
   *      ( lowest value prefixed with l, highest value prefixed with h,  separated by a pipe)
   *    - avg_rating=l3 (lower user rating accepted, prefixed with l)
   *  - For logged users only :
   *    - viewed=true (boolean true/false)
   *    - bookmarked=true
   *    - liked=true
   *    - rating=l4 (lower user rating accepted, prefixed with l)
   *
   * Each filter is joined with a & char, the example above would give a searchString like this :
   * season_number=3&genres=Comédie|Drame|Thriller&countries=Japan|United+States+of+America|France
   *  &runtime=h120&release_date=l1954|h2018&viewed=true&bookmarked=true&liked=true&rating=l4
   * @route Get /v1/movies/search/:filters?
   * @group - Movies
   * @param {string} filters - optionnal
   * @returns {Array} 200 - Array of all movies
   * @returns {APIError} 404 - Aucun film n'est enregistré en base
   */
  .get('/search/:filters?', getTokens.getAccessToken, routerWrapper(moviesController.getMovies))
  /**
   * Get the last movie
   * @route Get /v1/movies/lastmovie
   * @group - Movies
   * @returns {Movie} 200 - Movie Object
   * @returns {APIError} 404 - Aucun film n'a été publié.
   */
  .get('/lastmovie', routerWrapper(moviesController.getLastMovie))
  /**
   * Get a detailled movie object saved in database via its id
   * @route Get /v1/movies/id/:movieId
   * @group - Movies
   * @param {Integer} movieId
   * @returns {Movie} 200 - movie object
   * @returns {APIError} 404 - Ce film n'est pas enregistré en base, ou pas encore publié
   */
  .get('/id/:movieId', routerWrapper(moviesController.getMovieByID))
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
