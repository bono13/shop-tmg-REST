const Product = require('../models/product');

const fetchProduct = async (req, res, next) => {
	const _id = req.params.id;

	// console.log(req.params.id);

	try {
		const product = await Product.findById(_id);

		if (!product) {
			throw new Error();
		}

		req.product = product;
		next();
	} catch (err) {
		res.status(404).send({ error: 'No such Product in database' });
	}
};

module.exports = fetchProduct;
