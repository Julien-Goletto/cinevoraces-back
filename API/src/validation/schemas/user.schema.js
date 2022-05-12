const Joi = require('joi');

const userSchema = Joi.object({
  pseudo: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string(),
  role: Joi.string(),
}).required();

module.exports = userSchema;