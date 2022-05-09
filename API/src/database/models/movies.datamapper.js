const client = require('../dbclient');
const debug = require('debug')("Movie_DataMapper");
const APIError = require('../../Errors/APIError');

const moviesDataMapper = {
  /**
   * Get all movies in database
   * @returns {ARRAY} Game objects
   * @throws {APIError} If db is empty
   */
  async getAllMovies() {
    const query = 'SELECT * FROM movie';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No movie saved yet", 404);
    };
    return results.rows;
  },

  async getMovieByID(movieId) {
    const query =  {
      text: 'SELECT * FROM movie WHERE id=$1',
      values: [movieId]
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No movie saved yet", 404);
    };
    return results.rows;
  }
};

module.exports = moviesDataMapper;