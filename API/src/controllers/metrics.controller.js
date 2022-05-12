const debug = require('debug')('Metrics_Controller');
const metricsDataMapper = require('../database/models/metrics.datamapper');
const APIError = require('../Errors/APIError');

const metricsController = {
  async generalMetrics(_, res) {
    const results = await metricsDataMapper.getGeneralMetrics();
    debug(results);
    res.status(200).json(results);
  },

  async allUsersMetrics(_, res) {
    const results = await metricsDataMapper.getAllUsersMetrics();
    debug(results);
    res.status(200).json(results);
  },

  async userMetricsById(req, res) {
    const results = await metricsDataMapper.getAllUsersMetrics(req.params.userId);
    debug(results);
    res.status(200).json(results);
  }
};

module.exports = metricsController;