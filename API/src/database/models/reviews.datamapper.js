const client = require('../dbclient');

const reviewsDatamapper = {
  async getAllReviews(movieId) {
    const query = {
      text: 'SELECT * FROM reviews_movie WHERE movie_id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No reviews for this movie', 404);
    }
    return results.rows;
  },
};

module.exports = reviewsDatamapper;
