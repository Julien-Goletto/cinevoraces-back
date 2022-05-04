const client = require('../dbclient');
const debug = require('debug')("Game_DataMapper");
const APIError = require('../../Errors/APIError');

const gamesDataMapper = {
  /**
   * Get all games in database
   * @returns {ARRAY} Game objects
   * @throws {APIError} If db is empty
   */
  async getAllGames() {
    const query = 'SELECT * FROM game;';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No game saved yet", 404);
    };
    return results.rows;
  },
  /**
   * Get a full infos game object from its id
   * @param {Integer} gameId 
   * @returns {Game Object} requested game object
   * @throws {APIError} if no game matches with the passed id
   */
  async getGameInfosById(gameId){
    const query = { 
      text: `SELECT * FROM "all_games_with_infos"
              WHERE "id" = $1;`,
      values: [gameId],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This game is still not saved in base.", 404);
    };
    return results.rows;
  },
  /**
   * Post a new game, using the SQL function add_new_games
   * This function is deployed with the database, and raise itself an exception if the game already exists
   * @param {Object} game - Format verified in the router layer via JOI
   * @returns {String} feedback message if it worked
   * @throws {Error} Error from SQL exception, will be caught later and transformed into APIError.
   */
  async postNewGame(game){
    const query = {
      text: `SELECT add_new_game($1,$2,$3,$4,$5)`,
      values: [game.name, game.released, game.background_image, game.platforms, game.genres],
    };
    await client.query(query);
    return 'The game has been saved into database';
  },
  async deleteGame(gameTitle){
    const query = {
      text: `DELETE FROM game WHERE game.name = $1`,
      values: [gameTitle],
    };
    debug(query);
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This game doesn't exist in base.", 404);
    };
    return 'The game has been deleted from database';
  }
};

module.exports = gamesDataMapper;