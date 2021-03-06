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
  async lastMovie(_, res) {
    const results = await moviesDataMapper.getLastMovie();
    res.status(200).json(results);
  },
  async getAllMoviesFromLastSeason(_, res) {
    const results = await moviesDataMapper.getAllMoviesFromLastSeason();
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
  async updateMovie(req, res) {
    const { movieId } = req.params;
    const movieInfos = req.body;
    const result = await moviesDataMapper.updateMovie(movieId, movieInfos);
    res.status(201).json(result);
  },
  async deleteMovie(req, res) {
    const { movieId } = req.params;
    const result = await moviesDataMapper.deleteMovie(movieId);
    res.status(200).json(result);
  },

  async publishMovie(req, res) {
    const result = await moviesDataMapper.publishMovie(req.params.movieId, req.body.isPublished);
    res.status(200).json(result);
  },
};

module.exports = moviesController;
