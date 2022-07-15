const moviesDataMapper = require('../database/models/movies.datamapper');
const jwtMethods = require('../JWT/jwt.module');
const APIError = require('../Errors/APIError');

const moviesController = {
  async getMovies(req, res) {
    const { filters } = req.params;
    const { token } = req.session;
    let userId;
    if (token) {
      try {
        userId = jwtMethods.decryptAccessToken(token).id;
      } catch (err) {
        throw new APIError(err.message, req.url, 401);
      }
    }
    const results = await moviesDataMapper.getMovies(filters, userId);
    res.status(200).json(results);
  },
  async getMovieByID(req, res) {
    const { movieId } = req.params;
    const result = await moviesDataMapper.getMovieByID(movieId);
    res.status(200).json(result);
  },
  async getLastMovie(_, res) {
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
