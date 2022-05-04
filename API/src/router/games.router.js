const express = require('express');
const gamesController = require('../controllers/games.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { RAWGGameInfosSchema, gameSchema } = require('../validation/schemas/');


// Configuration du subRouter 
const gamesRouter = express.Router();

gamesRouter
  /**
   * Get a list of all games objects saved in database
   * @route Get /games
   * @group - Games
   * @returns {Array} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/', routerWrapper(gamesController.getAllGames))
  /**
   * Get a detailled game object saved in database via its id
   * @route Get /games/:gameId
   * @group - Games
   * @param {Integer} gameId
   * @returns {Game} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/:gameId', routerWrapper(gamesController.getGameInfosByID))
  /**
   * Get a game from RAWG services, getting all datas, before adding it to database with next post method
   * @route POST /games/newgame/
   * @group - Games
   * @param {Integer} platformId - correspond to platform Id from RAWG
   * @param {String} gameTitle - has to be exact
   * @returns {Game} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/newgame/', checkingUser.checkLogStatus, validate('body', RAWGGameInfosSchema), routerWrapper(gamesController.postGameFromRAWG))
  /**
   * Post a new game object in database. This method also create the non-existent platforms and genres
   * No direct methods are available to add the separately.
   * @route POST /games
   * @group - Games
   * @param {Game} game
   * @returns {Game} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/', checkingUser.checkLogStatus, validate('body', gameSchema), routerWrapper(gamesController.addNewGame)) 
  /**
   * Delete a game object from database, by its id.
   * @route DELETE /games/:gameID
   * @group - Games
   * @param {Integer} gameId
   * @returns {String} 204 - success response
   * @returns {APIError} 404 - fail response
   */
  .delete('/:gameTitle', checkingUser.checkAutorization, routerWrapper(gamesController.deleteGamebyId)); 

gamesRouter.use(handleError);

module.exports = gamesRouter;