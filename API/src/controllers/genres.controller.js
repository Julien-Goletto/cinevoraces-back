const debug = require('debug')('Game_Controller');
const genresDataMapper = require('../database/models/genres.datamapper');

const genresController = {
  async getAllGenres(_, res) {
    const result = await genresDataMapper.getAllGenres();
    res.status(200).json(result);
  },
  async getGenreByID(req, res) {
    const genreId = req.params.genreId;
    const result = await genresDataMapper.getGenreById(genreId);
    res.status(200).json(result);
  },
};

module.exports = genresController;