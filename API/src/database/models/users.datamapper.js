const client = require('../dbclient');
const debug = require('debug')("User_DataMapper");
const APIError = require('../../Errors/APIError');

const bcrypt = require('bcryptjs');

const usersDataMapper = {

  /**
   * Save a  new user in database, using bcrypt for password encrypting
   * @param {Object} user 
   * @returns {String} feedback message
   * @throws {APIError} if user already in base, due to unique constraint
   */
  async createUser(user) {
    let {pseudo, mail, password} = user;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password,salt);
    const query = {
      text : `INSERT INTO "user"("pseudo", "mail", "password") VALUES ($1,$2,$3)`,
      values:[pseudo,mail,encryptedPassword]
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This pseudo is already taken. Please choose another one.", 404);
    };
    return 'User successfully registered, please login to continue.';
  },

  async logUser(user) {
    const {pseudo, mail, password} = user;
    let query = {
      text: 'SELECT * FROM "user" WHERE pseudo=$1',
      values: [pseudo]
    };
    const result = await client.query(query);
    if(!result.rowCount){
      throw new APIError ("Invalid credentials", 404);
    };
    const testBCrypt = (await bcrypt.compare(password,result.rows[0].password));
    if (!await bcrypt.compare(password,result.rows[0].password)) {
      throw new APIError ("Invalid credentials", 404);
    }
    debug(result.rows[0]);
  },

  /**
   * User object, return matching user
   * @param {Object} user 
   * @returns {Object} informations from db for user
   * @throws {APIError} if user doesen't in db
   */
  async getUserById(userId) {
    const query = {
      text : `SELECT * FROM "user" WHERE id=$1`,
      values:[userId],
    }
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This account doesn't exist.", 404);
    };
    return results.rows[0];
  },

  /**
   * Return a list containing all registered users
   * @returns {ARRAY} of pseudos String
   * @throws {APIError} if the table user is empty
   */
  async getUsersList(){
    const query = `SELECT * FROM "user";`;
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No user registered yet.", 404);
    };
    return results.rows;
  },
  async deleteUserWithPseudo(pseudo){
    const query = {
      text: `DELETE FROM "user" WHERE pseudo = $1;`,
      values: [pseudo],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This user doesn't exist.", 404);
    };
    debug(results);
    return 'User successfuly deleted.';
  },
};

module.exports = usersDataMapper;