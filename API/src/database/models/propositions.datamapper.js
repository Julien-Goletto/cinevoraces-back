const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const propositionsDataMapper = {
  /**
   * Get all available propositions slots
   * @returns {ARRAY} propositions slots
   */
  async getAvailablePropositionSlots(userId) {
    // Verification that the user has no pending proposition
    let query = {
      text: `SELECT *
              FROM pending_propositions
              WHERE user_id=$1`,
      values: [userId],
    };
    let results = await client.query(query);
    if (results.rowCount) {
      throw new APIError('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.', '', 404);
    }
    query = 'SELECT * FROM next_propositions';
    results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('Aucun créneau de proposition disponible.', '', 404);
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
      throw new APIError('Aucune proposition enregistrée en base.', '', 404);
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
      throw new APIError("Cet utilisateur n'a pas de proposition de film en attente.", 404);
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
      text: 'SELECT * FROM next_propositions WHERE publishing_date = $1',
      values: [publishingDate],
    };
    let results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Le créneau demandé n'est pas disponible.", '', 400);
    }
    query.text = `UPDATE proposition_slot
                    SET is_booked = true
                    WHERE publishing_date=$1`;
    results = await client.query(query);
    return 'Le créneau demandé a été réservé.';
  },
  /**
   * Update a proposition slot from is_booked = false to true
   * @returns {ARRAY} propositions per user
   * @throws {APIError} If db is empty
   */
  async unbookPropositionSlot(publishingDate) {
    const query = {
      text: `UPDATE proposition_slot
              SET is_booked = false
              WHERE publishing_date=$1`,
      values: [publishingDate],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Le créneau n'a pas pu être libéré.", 400);
    }
    return 'Le créneau demandé a été libéré.';
  },
};

module.exports = propositionsDataMapper;
