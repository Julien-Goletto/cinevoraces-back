const debug = require('debug')('Game_Controller');
const platformsDataMapper = require('../database/models/platforms.datamapper');

const platformsController = {
  async getAllGenres(_, res) {
    const result = await platformsDataMapper.getAllPlatforms();
    res.status(200).json(result);
  },
  async getPlatformByID(req, res) {
    const platformId = req.params.platformId;
    const result = await platformsDataMapper.getPlatformById(platformId);
    res.status(200).json(result);
  },
};

module.exports = platformsController;