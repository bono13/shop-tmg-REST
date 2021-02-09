const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 15,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
