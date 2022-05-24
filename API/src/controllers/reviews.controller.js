const reviewsDatamapper = require('../database/models/reviews.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const reviewsController = {
  async getAllComments(req, res) {
    const results = await reviewsDatamapper.getAllComments(req.params.movieId);
    // eslint-disable-next-line no-unused-expressions
    (results.length === 0) ? res.status(200).json() : res.status(200).json(results);
  },

  async getUserReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de visualiser cette review.", req.url, 401);
    }
    const results = await reviewsDatamapper.getUserReview(userId, movieId);
    res.status(200).json(results);
  },

  async createReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de créer une review.", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.createReview(userId, movieId);
    res.status(201).send('Review crée.');
  },

  async updateReview(req, res) {
    const review = req.body;
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de modifier cette review.", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.updateReview(userId, movieId, review);
    res.status(201).send('Review modifiée.');
  },

  async deleteComment(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de supprimer ce commentaire.", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.deleteComment(userId, movieId);
    res.status(200).send('Commentaire supprimé');
  },

  async deleteReview(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    if (userId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de supprimer cette Review.", req.url, 401);
    }
    // eslint-disable-next-line max-len
    await reviewsDatamapper.deleteReview(userId, movieId);
    res.status(200).send('Review supprimée.');
  },
};

module.exports = reviewsController;
