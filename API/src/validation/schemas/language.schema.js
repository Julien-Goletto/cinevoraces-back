const Joi = require('joi');

const languageSchema = Joi.object({
  name: Joi.string().required(),
}).required();

module.exports = languageSchema;
