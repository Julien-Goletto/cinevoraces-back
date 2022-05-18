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

  async createReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de créer une review", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.createReview(userId, movieId);
    res.status(200).send('Review crée');
  },

  async updateComment(req, res) {
    const { comment } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de modifier ce commentaire", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.updateComment(userId, movieId, comment);
    res.status(200).send('Commentaire modifié');
  },

  async deleteReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de supprimer cette Review", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.deleteReview(userId, movieId);
    res.status(200).send('Review supprimée');
  },
};

module.exports = reviewsController;
