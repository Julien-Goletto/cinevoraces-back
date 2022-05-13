const Joi = require('joi');

const reviewSchema = Joi.object({
  rating: Joi.string().required(),
  comment: Joi.string().required(),
}).required();

module.exports = reviewSchema;
