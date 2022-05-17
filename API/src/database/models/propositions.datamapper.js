const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const propositionsDataMapper = {
  /**
   * Get all available propositions slots
   * @returns {ARRAY} propositions slots
   */
  async getAvailablePropositionSlots() {
    const query = 'SELECT * FROM next_propositions';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No proposition slot available.', '', 404);
    }
    return results.rows;
  },
  /**
   * Get all pending propositions
   * @returns {ARRAY} all pending propositions
   * @throws {APIError} If db is empty
   */
  async getPendingPropositions() {
    const query = 'SELECT * FROM pending_propositions';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No proposition in database.', '', 404);
    }
    return results.rows;
  },
  /**
   * Get the pending proposition from one user
   * @returns {ARRAY} propositions per user
   * @throws {APIError} If db is empty
   */
  async getPendingPropositionByUserID(userId) {
    const query = {
      text: `SELECT *
              FROM pending_propositions
              WHERE user_id=$1`,
      values: [userId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("This user doesn't have a pending proposition.", 404);
    }
    return results.rows;
  },
  /**
   * Update a proposition slot from is_booked = false to true
   * @returns {ARRAY} propositions per user
   * @throws {APIError} If db is empty
   */
  async bookPropositionSlot(publishingDate) {
    const query = {
      text: `UPDATE proposition_slot
              SET is_booked = true
              WHERE publishing_date=$1`,
      values: [publishingDate],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("The slot couldn't be booked", 400);
    }
    return results.rows;
  },
};

module.exports = propositionsDataMapper;
