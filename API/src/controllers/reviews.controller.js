const reviewsDatamapper = require('../database/models/reviews.datamapper');

const reviewsController = {
  async getAllComments(req, res) {
    const results = await reviewsDatamapper.getAllComments(req.params.movieId);
    res.status(200).json(results);
  },

};

module.exports = reviewsController;
