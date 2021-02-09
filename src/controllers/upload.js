const sharp = require('sharp');
const Product = require('../models/product');

exports.uploadImageById = async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
	req.product.image = buffer;

	await req.product.save();

	res.json('Upload Successful!');
};

exports.getImageById = async (req, res) => {
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
};

exports.deleteImageById = async (req, res) => {
	req.product.image = undefined;
	await req.product.save();
	res.json('Image Deleted');
};
