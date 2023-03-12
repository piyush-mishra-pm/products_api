const {Joi} = require('express-validation');

// Express-validation models for different routes.
// Validates inputs to different api routes.

const MAX_PRODUCT_QUANTITY = 10_000;

const createProduct = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(0).max(MAX_PRODUCT_QUANTITY).required(),
}).options({allowUnknown: false});

const updateProduct = Joi.object({
  number: Joi.number().integer().min(0).max(MAX_PRODUCT_QUANTITY).required(),
}).options({allowUnknown: false});

module.exports = {MAX_PRODUCT_QUANTITY, createProduct, updateProduct};
