const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const reviewsDatamapper = {
  async getAllComments(movieId) {
    const query = {
      text: 'SELECT * FROM movie_comments WHERE movie_id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No comments for this movie', '', 404);
    }
    return results.rows;
  },

  async getUserReview(userId, movieId) {
    const query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No comments for this movie', '', 404);
    }
    return results.rows;
  },
};

module.exports = reviewsDatamapper;
