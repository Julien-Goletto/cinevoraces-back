const client = require('../dbclient');
const debug = require('debug')("Genre_DataMapper");
const APIError = require('../../Errors/APIError');

const genresDataMapper = {
  /**
   * Get all genres in database
   * @returns {ARRAY} Genre objects
   * @throws {APIError} If db is empty
   */
  async getAllGenres() {
    const query = 'SELECT * FROM genre;';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No genre saved yet", 404);
    };
    return results.rows;
  },
    /**
   * Get a specific genre object from its id
   * @param {Integer} genreId 
   * @returns {Genre Object} requested genre object
   * @throws {APIError} if no genre matches with the passed id
   */
  async getGenreById(genreId){
    const query = { 
      text: `SELECT * FROM "genre"
              WHERE "id" = $1;`,
      values: [genreId],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This genre still doesn't exist in base.", 404);
    };
    return results.rows;
  }
};

module.exports = genresDataMapper;