const ErrorObject = require('../utils/ErrorObject');
const Product = require('../models/product');
const {mongoDBToApiDTO} = require('../utils/DTO');

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorObject(400, 'No such product exists.'));
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully fetched product',
      data: mongoDBToApiDTO(product),
    });
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt get product by ID. Something went wrong in getProductById.: ${err}`));
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).send({
      success: true,
      message: 'Successfully fetched products',
      data: allProducts.map((product) => mongoDBToApiDTO(product)),
    });
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt get all products. Something went wrong in getProducts: ${err}`));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {name, quantity} = req.body;

    // Creator does exist, so lets create the quote.
    const createdProduct = new Product({
      name,
      quantity,
    });

    await createdProduct.save();

    return res.status(201).send({
      message: 'Successfully created product.',
      success: true,
      data: mongoDBToApiDTO(createProduct),
    });
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt Create Product. Something went wrong in createProduct: ${err}`));
  }
};

// PATCH: products/products/:id/update_quantity/?number=10
const updateProduct = async (req, res, next) => {
  try {
    const {number} = req.query;
    const {productId} = req.params;

    let productToUpdate = await Product.findById(productId);

    if (!productToUpdate) {
      return next(new ErrorObject(400, 'Product not found, cannot update the product!'));
    }

    productToUpdate.quantity = number;

    await productToUpdate.save();

    return res.status(200).send({
      message: 'Successfully updated the product.',
      success: true,
      data: mongoDBToApiDTO(productToUpdate),
    });
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt Update Product. Something went wrong in updateProduct: ${err}`));
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorObject(400, 'Product not found, so cannot delete the product.'));
    }

    await Product.deleteOne({_id: product._id});

    return res.status(200).json({data: {}, success: true, message: 'Deleted quote.'});
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt Delete Product. Something went wrong in deleteProduct: ${err}`));
  }
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};