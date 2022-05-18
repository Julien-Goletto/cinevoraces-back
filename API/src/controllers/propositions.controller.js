const propositionsDataMapper = require('../database/models/propositions.datamapper');

const propositionsController = {
  async availablePropositionsSlots(req, res) {
    const results = await propositionsDataMapper.getAvailablePropositionSlots(req.params.userId);
    if (typeof results === 'string') {
      res.status(200).json(results);
    }
    for (const slot of results) {
      const date = slot.publishing_date.toISOString().slice(0, -14);
      slot.publishing_date = date;
    }
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
    const { publishingDate } = req.body;
    const results = await propositionsDataMapper.bookPropositionSlot(publishingDate);
    res.status(201).json(results);
  },
  async unbookPendingPropositionsSlot(req, res) {
    const { publishingDate } = req.body;
    const results = await propositionsDataMapper.unbookPropositionSlot(publishingDate);
    res.status(201).json(results);
  },
};

module.exports = propositionsController;
