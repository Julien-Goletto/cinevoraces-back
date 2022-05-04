const Joi = require('joi');

const userSchema = Joi.object({
  pseudo: Joi.string().required(),
  password: Joi.string().required(),
}).required();

module.exports = userSchema;