const express = require('express');
const router = express.Router();

const productController = require('../controllers/products-controller');
const useCacheIfStored = require('../middlewares/useCacheIfStored');
const validationFactory = require('../middlewares/validationFactory');
const validationSchemas = require('../models/validationSchemas');
const redisHelper = require('../redis/redisHelper');

router.get('/', useCacheIfStored(redisHelper.REDIS_QUERY_TYPE.GET_PRODUCTS), productController.getProducts);

router.get(
  '/:productId',
  validationFactory(validationSchemas.withProductId, 'params'),
  useCacheIfStored(redisHelper.REDIS_QUERY_TYPE.GET_PRODUCT),
  productController.getProductById
);

router.post('/create', validationFactory(validationSchemas.createProduct, 'body'), productController.createProduct);

// PATCH: products/products/:id/update_quantity/?number=10
router.patch(
  '/:productId/update_quantity',
  validationFactory(validationSchemas.withProductId, 'params'),
  validationFactory(validationSchemas.withNumber, 'query'),
  productController.updateProduct
);

router.delete(
  '/:productId',
  validationFactory(validationSchemas.withProductId, 'params'),
  productController.deleteProduct
);

module.exports = router;
