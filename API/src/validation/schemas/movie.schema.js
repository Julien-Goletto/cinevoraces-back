const Joi = require('joi');

const movieSchema = Joi.object({
  french_title: Joi.string().required(),
  original_title: Joi.string().required(),
  poster_url: Joi.string().required(),
  directors: Joi.array().items(Joi.string()).min(1).required(),
  release_date: Joi.date().required(),
  runtime: Joi.number().required(),
  casting: Joi.array().items(Joi.string()).min(1).required(),
  presentation: Joi.string().required(),
  publishing_date: Joi.date().required()
}).required();

module.exports = movieSchema;