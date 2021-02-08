const express = require('express');
const passport = require('passport');
const productControllers = require('../controllers/product');

const router = new express.Router();

router.post(
	'/products',
	passport.authenticate('jwt', { session: false }),
	productControllers.createProduct
);

router.get(
	'/products',
	passport.authenticate('jwt', { session: false }),
	productControllers.getProducts
);

router.get(
	'/products/:id',
	passport.authenticate('jwt', { session: false }),
	productControllers.getProductById
);

router.patch(
	'/products/:id',
	passport.authenticate('jwt', { session: false }),
	productControllers.updateProduct
);

router.delete(
	'/products/:id',
	passport.authenticate('jwt', { session: false }),
	productControllers.deleteProduct
);

module.exports = router;
