const propositionsDataMapper = require('../database/models/propositions.datamapper');

const propositionsController = {
  async hasAPendingProposition(req, res) {
    const results = await propositionsDataMapper.hasAPendingProposition(req.params.userId);
    return res.status(200).json(results);
  },
  async availablePropositionsSlots(_, res) {
    const results = await propositionsDataMapper.getAvailablePropositionSlots();
    res.status(200).json(results);
  },

  async pendingPropositions(_, res) {
    const results = await propositionsDataMapper.getPendingPropositions();
    res.status(200).json(results);
  },

  async userPendingPropositionsById(req, res) {
    const results = await propositionsDataMapper.getPendingPropositionByUserID(req.params.userId);
    res.status(200).json(results);
  },
  async bookPendingPropositionsSlot(req, res) {
    const results = await propositionsDataMapper.bookPropositionSlot(req.body.publishing_date);
    res.status(201).json(results);
  },
  async unbookPendingPropositionsSlot(req, res) {
    const results = await propositionsDataMapper.unbookPropositionSlot(req.body.publishing_date);
    res.status(201).json(results);
  },
};

module.exports = propositionsController;
