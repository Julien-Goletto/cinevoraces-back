const Joi = require('joi');

const genreSchema = Joi.object({
  name: Joi.string().required(),
}).required();

module.exports = genreSchema;
