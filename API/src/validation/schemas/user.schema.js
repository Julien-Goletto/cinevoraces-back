const Joi = require('joi');

const userSchema = Joi.object({
  pseudo: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required()
}).required();

module.exports = userSchema;