const express = require('express');
const genresController = require('../controllers/genres.controller');

// // Gestion des erreurs
const routerWrapper = require('../middlewares/routerWrapper');
const handleError = require('../middlewares/handleError');

// Configuration du subRouter 
const genresRouter = express.Router();

genresRouter
/**
 * Get 
 * @route GET /genres
 * @group - Genres
 * @return {Array} 200 - success response - Array of genres objects
 * @return {APIError} 404 - fail response
 */
  .get('/', routerWrapper(genresController.getAllGenres))
  /**
 * Get 
 * @route GET /genres/:genreId
 * @group - Genres
 * @param {Integer} genreId
 * @return {Array} 200 - success response - genre object
 * @return {APIError} 404 - fail response
 */
  .get('/:genreId', routerWrapper(genresController.getGenreByID));

genresRouter.use(handleError);

module.exports = genresRouter;