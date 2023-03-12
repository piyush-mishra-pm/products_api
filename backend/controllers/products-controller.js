const ErrorObject = require('../utils/ErrorObject');
const Product = require('../models/product');

const getProductById = async (req, res, next) => {
  //return next(new ErrorObject('Couldnt get product by ID. Something went wrong in getProductById.', 500));
  return res.send('getProductById');
};

const getProducts = async (req, res, next) => {
  //return next(new ErrorObject('Couldnt get all products. Something went wrong in getProducts.', 500));
  return res.send('getProducts');
};

const createProduct = async (req, res, next) => {
  //return next(new ErrorObject(`Couldnt Create Product. Something went wrong in createProduct.`, 500));
  return res.send('createProduct');
};

// PATCH: products/products/:id/update_quantity/?number=10
const updateProduct = async (req, res, next) => {
  //return next(new ErrorObject(`Couldnt Update Product. Something went wrong in updateProduct.`, 500));
  return res.send('updateProduct');
};

const deleteProduct = async (req, res, next) => {
  //return next(new ErrorObject(`Couldnt Delete Product. Something went wrong in deleteProduct.`, 500));
  return res.send('deleteProduct');
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
