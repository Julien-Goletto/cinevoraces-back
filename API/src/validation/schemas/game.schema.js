const Joi = require('joi');

const gameSchema = Joi.object({
  name: Joi.string(),
  platforms: Joi.array().items(Joi.string()).min(1).required(),
  released: Joi.string().required(),
  background_image: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).min(1).required()
}).required();

module.exports = gameSchema;