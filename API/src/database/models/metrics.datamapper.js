const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const metricsDataMapper = {
  /**
   * Get all metrics from CinéVoraces
   * @returns {ARRAY} metrics
   */
  async getGeneralMetrics() {
    const query = 'SELECT * FROM global_metrics';
    const results = await client.query(query);
    return results.rows;
  },
  /**
   * Get all metrics from CinéVoraces users
   * @returns {ARRAY} metrics per user
   * @throws {APIError} If db is empty
   */
  async getAllUsersMetrics() {
    const query = 'SELECT * FROM indiv_actions_metrics';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No user saved in database.', '', 404);
    }
    return results.rows;
  },
  /**
   * Get all metrics from one CinéVoraces user
   * @returns {ARRAY} metrics per user
   * @throws {APIError} If db is empty
   */
  async getUserMetricsByID(userId) {
    const query = {
      text: `SELECT *
              FROM indiv_actions_metrics
              WHERE user_id=$1`,
      values: [userId],
    };
    let results = await client.query(query);
    console.log(results.rows);
    if (!results.rowCount) {
      query.text = 'SELECT * FROM "user" WHERE id=$1';
      results = await client.query(query);
      if (!results.rowCount) {
        throw new APIError("This user doesn't exist.", '', 404);
      } else {
        return [{
          user_id: userId,
          proposed_movies_count: 0,
          comments_count: 0,
          likes_count: 0,
          watchlist_count: 0,
          ratings_count: 0,
        }];
      }
    }
    return results.rows;
  },
};

module.exports = metricsDataMapper;
