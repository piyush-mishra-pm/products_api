const express = require('express');

const productController = require('../controllers/products-controller');
const validationFactory = require('../middlewares/validationFactory');
const validationSchemas = require('../models/validationSchemas');
const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductById);

router.post('/create', validationFactory(validationSchemas.createProduct, 'body'), productController.createProduct);

// PATCH: products/products/:id/update_quantity/?number=10
router.patch(
  '/:productId/update_quantity',
  validationFactory(validationSchemas.updateProduct, 'query'),
  productController.updateProduct
);

router.delete('/:productId', productController.deleteProduct);

module.exports = router;
