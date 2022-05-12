const client = require('../dbclient');
// const debug = require('debug')("Metrics_DataMapper");
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
    const query =  'SELECT * FROM indiv_actions_metrics';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No user saved in database.", 404);
    };
    return results.rows;
  },
  /**
   * Get all metrics from one CinéVoraces user
   * @returns {ARRAY} metrics per user
   * @throws {APIError} If db is empty
   */
  async getUserMetricsByID(userId) {
    const query =  {
      text: `SELECT proposed_movies_count,comments_count,likes_counts,watchlist_count,ratings_count
              FROM indiv_actions_metrics WHERE id=$1`,
      values: [userId],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This user doesn't exist.", 404);
    };
    return results.rows;
  }
};

module.exports = metricsDataMapper;