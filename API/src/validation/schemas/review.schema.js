const Joi = require('joi');

const reviewSchema = Joi.object({
  bookmarked: Joi.boolean(),
  viewed: Joi.boolean(),
  liked: Joi.boolean(),
  rating: Joi.number(),
  comment: Joi.string(),
}).required();

module.exports = reviewSchema;
