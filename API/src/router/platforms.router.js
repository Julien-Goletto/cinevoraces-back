const express = require('express');
const platformsController = require('../controllers/platforms.controller');

// // Gestion des erreurs
const routerWrapper = require('../middlewares/routerWrapper');
const handleError = require('../middlewares/handleError');

// Configuration du subRouter 
const platformsRouter = express.Router();

platformsRouter
/**
 * Get 
 * @route GET /platforms
 * @group - Platforms
 * @return {Array} 200 - success response - Array of platforms objects
 * @return {APIError} 404 - fail response
 */
  .get('/', routerWrapper(platformsController.getAllGenres))
  /**
 * Get 
 * @route GET /platforms/:platformId
 * @group - Platforms
 * @param {Integer} platformId
 * @return {Platform} 200 - success response - Platform object
 * @return {APIError} 404 - fail response
 */
  .get('/:platformId', routerWrapper(platformsController.getPlatformByID));

platformsRouter.use(handleError);

module.exports = platformsRouter;