const Joi = require('joi');

const userLoginSchema = Joi.object({
  pseudo: Joi.string().required(),
  mail: Joi.string(),
  password: Joi.string().required(),
  avatar_url: Joi.string(),
  role: Joi.string(),
}).required();

module.exports = userLoginSchema;
