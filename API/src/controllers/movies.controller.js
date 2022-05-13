const moviesDataMapper = require('../database/models/movies.datamapper');

const moviesController = {
  async getAllMovies(_, res) {
    const results = await moviesDataMapper.getAllMovies();
    res.status(200).json(results);
  },

  async getMovieByID(req, res) {
    const { movieId } = req.params;
    const result = await moviesDataMapper.getMovieByID(movieId);
    res.status(200).json(result);
  },
  async getAllMoviesForLastSeason(req, res) {
    const results = await moviesDataMapper.getAllMoviesForLastSeason();
    res.status(200).json(results);
  },

  async getAllMoviesBySeason(req, res) {
    const results = await moviesDataMapper.getAllMoviesBySeason(req.params.seasonId);
    res.status(200).json(results);
  },

  async addNewMovie(req, res) {
    const movie = req.body;
    const result = await moviesDataMapper.addNewMovie(movie);
    res.status(201).json(result);
  },
};

module.exports = moviesController;
