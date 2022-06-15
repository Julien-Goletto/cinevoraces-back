const metricsDataMapper = require('../database/models/metrics.datamapper');

const metricsController = {
  async generalMetrics(_, res) {
    const results = await metricsDataMapper.getGeneralMetrics();
    res.status(200).json(results);
  },

  async allUsersMetrics(_, res) {
    const results = await metricsDataMapper.getAllUsersMetrics();
    res.status(200).json(results);
  },

  async userMetricsById(req, res) {
    const results = await metricsDataMapper.getUserMetricsByID(parseInt(req.params.userId, 10));
    res.status(200).json(results);
  },

  async filtersOptions(_, res) {
    const results = await metricsDataMapper.getFiltersOptions();
    res.status(200).json(results);
  },
};

module.exports = metricsController;
