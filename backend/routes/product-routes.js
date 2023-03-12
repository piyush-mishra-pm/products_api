const express = require('express');

const quotesController = require('../controllers/products-controller');

const router = express.Router();

router.get('/', quotesController.getProducts);

router.get('/:productId', quotesController.getProductById);

router.post('/create', quotesController.createProduct);

// PATCH: products/products/:id/update_quantity/?number=10
router.patch('/:productId/update_quantity', quotesController.updateProduct);

router.delete('/:productId', quotesController.deleteProduct);

module.exports = router;
