const reviewsDatamapper = require('../database/models/reviews.datamapper');

const reviewsController = {
  async getAllReviews(req, res) {
    const results = await reviewsDatamapper.getAllReviews(req.params.movieId);
    res.status(200).json(results);
  },

};

module.exports = reviewsController;
