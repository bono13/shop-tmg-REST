const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/product');

const myProduct = require('../utils/upload');

// const uploadControllers = require('../controllers/upload');

const router = new express.Router();

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
	myProduct,
	upload.single('image'),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.product.image = buffer;

		await req.product.save();

		res.json('Upload Successful!');
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.get('/upload/:id/image', async (req, res) => {
	// console.log(req.params.id);
	try {
		const product = await Product.findById(req.params.id);

		if (!product || !product.image) {
			throw new Error();
		}

		res.set('Content-Type', 'image/jpg');
		res.send(product.image);
	} catch (err) {
		res.status(404).send();
	}
});

router.delete('/upload/:id/image', myProduct, async (req, res) => {
	req.product.image = undefined;
	await req.product.save();
	res.json('Image Deleted');
});

module.exports = router;
