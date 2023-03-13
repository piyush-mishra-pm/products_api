const ErrorObject = require('../utils/ErrorObject');
const Product = require('../models/product');
const {mongoDBToApiDTO} = require('../utils/DTO');
const {redisSave, redisDeleteKey} = require('../redis/redis');
const {getRedisKey, REDIS_QUERY_TYPE} = require('../redis/redisHelper');
const {MAX_PRODUCT_QUANTITY} = require('../models/validationSchemas');

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorObject(400, 'No such product exists.'));
    }
    const responseObject = {
      success: true,
      message: 'Successfully fetched product',
      data: mongoDBToApiDTO(product),
    };

    // Populate Cache:
    await redisSave(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCT, req), responseObject);

    // Return response:
    return res.status(200).send(responseObject);
  } catch (err) {
    return next(new ErrorObject(500, `Couldnt get product by ID. Something went wrong in getProductById.: ${err}`));
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});

    const responseObject = {
      success: true,
      message: 'Successfully fetched products',
      data: allProducts.map((product) => mongoDBToApiDTO(product)),
    };

    // Populate Cache:
    await redisSave(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCTS, req), responseObject);

    return res.status(200).send(responseObject);
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

    // Invalidating Cahce: (Get All Products Cache needs to refresh on next get request).
    await redisDeleteKey(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCTS, req));

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

    // Out of range check (after subtraction or addition): [0,10_000] is valid range of quantity
    const possibleUpdatedQuantity = parseInt(number) + parseInt(productToUpdate.quantity);
    if (possibleUpdatedQuantity > MAX_PRODUCT_QUANTITY || possibleUpdatedQuantity < 0) {
      return next(
        new ErrorObject(
          400,
          `Quanity ${possibleUpdatedQuantity} is out of range as [0,${MAX_PRODUCT_QUANTITY}]. Cannot update the product quantity!`
        )
      );
    }

    productToUpdate.quantity = possibleUpdatedQuantity;

    await productToUpdate.save();

    const responseObject = {
      message: 'Successfully updated the product.',
      success: true,
      data: mongoDBToApiDTO(productToUpdate),
    };

    // Cache Invalid: So need to update entry for productId related entry.
    await redisSave(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCT, req), responseObject);

    // Cache Invalid: So need to update entry for all Products as well.
    // We dont have that data yet, but on next getProducts request, it will get populated.
    await redisDeleteKey(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCTS, req));

    return res.status(200).send(responseObject);
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
    await redisDeleteKey(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCTS, req));
    await redisDeleteKey(getRedisKey(REDIS_QUERY_TYPE.GET_PRODUCT, req));
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