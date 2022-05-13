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
  publishing_date: Joi.date().required(),
  user_id: Joi.number().required(),
  season_id: Joi.number().required(),
  movie_genres: Joi.array().items(Joi.string()).min(1).required(),
  movie_languages: Joi.array().items(Joi.string()).min(1).required(),
  movie_countries: Joi.array().items(Joi.string()).min(1).required(),
}).required();

module.exports = movieSchema;
