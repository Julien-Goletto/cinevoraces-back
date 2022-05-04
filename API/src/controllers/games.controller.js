const debug = require('debug')('Game_Controller');
const gamesDataMapper = require('../database/models/games.datamapper');
const RAWG = require('../external_api/')

const gamesController = {
  async getAllGames(_, res) {
    const result = await gamesDataMapper.getAllGames();
    res.status(200).json(result);
  },
  async getGameInfosByID(req, res) {
    const gameId = req.params.gameId;
    const result = await gamesDataMapper.getGameInfosById(gameId);
    res.status(200).json(result);
  },
  async postGameFromRAWG(req, res){
    const { RAWG_API_KEY } = process.env;
    debug(req.body);
    const {platformId, gameTitle} = req.body;
    const result = await RAWG.getGamesFromPlatformIdAndSearchQuery(RAWG_API_KEY, platformId, gameTitle);
    res.status(200).json(result);
  },
  async addNewGame(req,res){
    const game = req.body;
    const result = await gamesDataMapper.postNewGame(game);
    res.status(201).json(result);
  },
  async deleteGamebyId(req,res){
    debug(req.session);
    const gameTitle = req.params.gameTitle;
    const result = await gamesDataMapper.deleteGame(gameTitle);
    res.status(200).json(result);
  }
};

module.exports = gamesController;