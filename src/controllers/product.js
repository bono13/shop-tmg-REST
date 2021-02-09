const Product = require('../models/product');

exports.createProduct = async (req, res) => {
	// const product = new Product(req.body);
	const product = new Product({ ...req.body, index: await Product.count() });

	try {
		await product.save();
		res.status(200).send(product);
	} catch (err) {
		res.status(400).send(err);
	}
};
//GET /products?title=<value>
//GET /products?limit=2&skip=2
//GET /products?sortBy=createdAt:<value>  asc or desc
exports.getProducts = async (req, res) => {
	const sort = {};
	let filter = {};

	try {
		if (req.query.sortBy) {
			const parts = req.query.sortBy.split(':');
			sort[parts[0]] = parts[1];
		} else if (req.query.limit || req.query.skip) {
			queryLimit = req.query.limit;
			querySkip = req.query.skip;
		} else {
			filter = req.query;
		}

		// console.log(filter);

		const products = await Product.find(filter)
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.skip))
			.sort(sort);

		res.send(products);
	} catch (err) {
		res.status(500).send(err);
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
	const allowedUpdates = ['title', 'price', 'description', 'SKU'];
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
