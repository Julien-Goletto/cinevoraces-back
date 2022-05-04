const client = require('../dbclient');
const debug = require('debug')("Platforms_DataMapper");
const APIError = require('../../Errors/APIError');

const platformsDataMapper = {
  /**
   * Get all platforms in database
   * @returns {ARRAY} Platform objects
   * @throws {APIError} If db is empty
   */
  async getAllPlatforms() {
    const query = 'SELECT * FROM platform;';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No platform saved yet", 404);
    };
    return results.rows;
  },
  /**
   * Get a specific platform object from its id
   * @param {Integer} genreId 
   * @returns {Platform Object} requested platform object
   * @throws {APIError} if no platform matches with the passed id
   */
  async getPlatformById(platformId){
    const query = { 
      text: `SELECT * FROM "platform"
              WHERE "id" = $1;`,
      values: [platformId],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This platform still doesn't exist in base.", 404);
    };
    return results.rows;
  }
};

module.exports = platformsDataMapper;