const reviewsDatamapper = require('../database/models/reviews.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const reviewsController = {
  async getAllComments(req, res) {
    const results = await reviewsDatamapper.getAllComments(req.params.movieId);
    res.status(200).json(results);
  },

  async getUserReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de visualiser cette review", req.url, 401);
    }
    const results = await reviewsDatamapper.getUserReview(userId, movieId);
    res.status(200).json(results);
  },

  async addComment(req, res) {
    const result = await reviewsDatamapper.addComment(req.params.movieId);
    res.status(200).json(result);
  },
};

module.exports = reviewsController;
