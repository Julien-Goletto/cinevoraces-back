const client = require('../dbclient');
const APIError = require('../../Errors/APIError');
const { deleteComment } = require('../../controllers/reviews.controller');

const reviewsDatamapper = {
  async getAllComments(movieId) {
    const query = {
      text: 'SELECT * FROM movie_comments WHERE movie_id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('Pas de commentaires sur ce film', '', 404);
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
      throw new APIError('Pas de données pour ce film', '', 404);
    }
    return results.rows;
  },

  async createComment(userId, movieId, comment) {
    let query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (result.rowCount > 0) {
      throw new APIError('Commentaire déjà présent', '', 404);
    }
    query = {
      text: 'INSERT INTO review (user_id, movie_id, comment) VALUES ($1,$2,$3)',
      values: [userId, movieId, comment],
    };
    await client.query(query);
    return result.rows;
  },

  async updateComment(userId, movieId, comment) {
    let query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (!result.rowCount) {
      throw new APIError('Commentaire non trouvé');
    }
    query = {
      text: 'UPDATE review SET comment=$3 WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId, comment],
    };
    await client.query(query);
    return result.rows;
  },

  async deleteComment(userId, movieId) {
    let query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (!result.rowCount) {
      throw new APIError('Commentaire non trouvé');
    }
    query = {
      text: 'UPDATE review SET comment = null WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    await client.query(query);
    return result.rows;
  }
};

module.exports = reviewsDatamapper;