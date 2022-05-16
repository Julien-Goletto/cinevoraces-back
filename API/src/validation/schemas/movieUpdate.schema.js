const Joi = require('joi');

const movieUpdateSchema = Joi.object({
  french_title: Joi.string(),
  original_title: Joi.string(),
  poster_url: Joi.string(),
  directors: Joi.array().items(Joi.string()).min(1),
  release_date: Joi.date(),
  runtime: Joi.number(),
  casting: Joi.array().items(Joi.string()).min(1),
  presentation: Joi.string(),
  publishing_date: Joi.date(),
}).min(1);

module.exports = movieUpdateSchema;
