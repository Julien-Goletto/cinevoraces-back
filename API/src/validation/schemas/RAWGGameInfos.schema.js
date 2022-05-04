const Joi = require('joi');

const RAWGGameInfosSchema = Joi.object({
  platformId: Joi.number().integer().required(),
  gameTitle: Joi.string().required()
}).required();

module.exports = RAWGGameInfosSchema;