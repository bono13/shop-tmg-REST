const express = require('express');

const productControllers = require('../controllers/product');

const router = new express.Router();

router.post('/products', productControllers.createProduct);

router.get('/products', productControllers.getProducts);

router.get('/products/:id', productControllers.getProductById);

router.patch('/products/:id', productControllers.updateProduct);

router.delete('/products/:id', productControllers.deleteProduct);

module.exports = router;
