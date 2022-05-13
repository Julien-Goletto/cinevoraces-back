const Joi = require('joi');

const seasonSchema = Joi.object({
  number: Joi.number().required(),
  year: Joi.number().required(),
}).required();

module.exports = seasonSchema;
