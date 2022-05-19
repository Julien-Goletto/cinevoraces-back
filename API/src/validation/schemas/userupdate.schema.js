const Joi = require('joi');

const userUpdateSchema = Joi.object({
  pseudo: Joi.string(),
  oldPassword: Joi.string(),
  mail: Joi.string(),
  password: Joi.string(),
  avatar_url: Joi.string(),
  role: Joi.string(),
}).required();

module.exports = userUpdateSchema;
