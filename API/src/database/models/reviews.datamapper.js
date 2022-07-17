const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const reviewsDatamapper = {
  async getAllComments(movieId) {
    const query = {
      text: 'SELECT * FROM movie_comments WHERE movie_id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    return results.rows;
  },

  async getUserReview(userId, movieId) {
    const query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Cet utilisateur n'a pas encore intéragi avec ce film", '', 404);
    }
    return results.rows;
  },

  async createReview(userId, movieId) {
    const query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (result.rowCount > 0) {
      throw new APIError('Review déjà présente', '', 400);
    }
    query.text = 'INSERT INTO review (user_id, movie_id) VALUES ($1,$2)';
    await client.query(query);
    return result.rows;
  },

  async updateReview(userId, movieId, review) {
    const reviewToUpdate = review;
    let query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (!result.rowCount) {
      throw new APIError('Review non trouvé', '', 404);
    }
    query = { text: 'UPDATE review SET ', values: [] };
    let i = 1;
    for (const key of Object.keys(reviewToUpdate)) {
      query.text += `${key} = $${i},`;
      query.values.push(reviewToUpdate[key]);
      i += 1;
    }
    query.text = query.text.slice(0, -1);
    query.text += ` WHERE user_id=$${i} AND movie_id=$${i + 1}`;
    query.values.push(userId, movieId);
    await client.query(query);
    return result.rows;
  },

  async deleteComment(userId, movieId) {
    const query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (!result.rowCount) {
      throw new APIError('Review non trouvé', '', 400);
    }
    query.text = 'UPDATE review SET comment = null WHERE user_id=$1 AND movie_id=$2';
    await client.query(query);
    return result.rows;
  },

  async deleteReview(userId, movieId) {
    const query = {
      text: 'SELECT * FROM review WHERE user_id=$1 AND movie_id=$2',
      values: [userId, movieId],
    };
    const result = await client.query(query);
    if (!result.rowCount) {
      throw new APIError('Review non trouvé', '', 400);
    }
    query.text = 'DELETE FROM Review WHERE user_id=$1 AND movie_id=$2';
    await client.query(query);
    return result.rows;
  },
};

module.exports = reviewsDatamapper;
