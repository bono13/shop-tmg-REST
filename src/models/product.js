const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		index: {
			type: Number,
			required: true,
		},
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
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.pre('save', function (done) {
	const sku = skumaker(this.index);
	this.SKU = sku;
	done();
});

function skumaker(value) {
	const valueStr = value + '';
	const zerosRequired = 5 - valueStr.length;
	let result = '';
	for (let i = 0; i < zerosRequired; i++) {
		result += '0';
	}
	return result + valueStr;
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
