const express = require('express');
const multer = require('multer');
const passport = require('passport');

const fetchProduct = require('../utils/upload');
const uploadControllers = require('../controllers/upload');

const router = new express.Router();

//multer config
const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image'));
		}

		cb(undefined, true);
	},
});

router.post(
	'/upload/:id',
	passport.authenticate('jwt', { session: false }),
	fetchProduct,
	upload.single('image'),
	uploadControllers.uploadImageById,
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.get(
	'/upload/:id/image',
	passport.authenticate('jwt', { session: false }),
	uploadControllers.getImageById
);

router.delete(
	'/upload/:id/image',
	passport.authenticate('jwt', { session: false }),
	fetchProduct,
	uploadControllers.deleteImageById
);

module.exports = router;
