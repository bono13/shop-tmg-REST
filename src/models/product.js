const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: Buffer,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		SKU: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
