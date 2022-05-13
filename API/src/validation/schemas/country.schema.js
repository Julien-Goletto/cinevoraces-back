const Joi = require('joi');

const countrySchema = Joi.object({
  name: Joi.string().required(),
}).required();

module.exports = countrySchema;
