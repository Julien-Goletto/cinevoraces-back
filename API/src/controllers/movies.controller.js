const debug = require('debug')('Movie_Controller');
const moviesDataMapper = require('../database/models/movies.datamapper');

const moviesController = {
  async getAllMovies(req, res) {
    const result = await moviesDataMapper.getAllMovies();
    res.status(200).json(result);
  },

  async getMovieByID(req, res) {
    const movieId = req.params.movieId;
    const result = await moviesDataMapper.getMovieByID(movieId);
    res.status(200).json(result);
  }
};

module.exports = moviesController;