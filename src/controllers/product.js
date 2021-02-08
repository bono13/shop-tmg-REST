const Product = require('../models/product');

exports.createProduct = async (req, res) => {
	const product = new Product(req.body);

	try {
		await product.save();
		res.status(200).send(product);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.send(products);
	} catch (err) {
		res.status(500).send();
	}
};

exports.getProductById = async (req, res) => {
	const _id = req.params.id;

	try {
		const product = await Product.findById(_id);

		if (!product) {
			return res.status(404).send();
		}

		res.send(product);
	} catch (err) {
		res.status(500).send();
	}
};

exports.updateProduct = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['title', 'imageUrl', 'price', 'description', 'SKU'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const product = await Product.findByIdAndUpdate(req.params.id);

		updates.forEach((update) => {
			product[update] = req.body[update];
		});

		await product.save();

		if (!product) {
			return res.status(404).send();
		}

		res.send(product);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			res.status(404).send();
		}

		res.send(product);
	} catch (err) {
		res.status(500).send();
	}
};
