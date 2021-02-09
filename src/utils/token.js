const jwt = require('jsonwebtoken');

const createMessage = (msg, err) => ({ msg, err });

const signToken = (userID) => {
	return jwt.sign(
		{
			iss: `${process.env.JWT_SECRET}`,
			sub: userID,
		},
		`${process.env.JWT_SECRET}`,
		{ expiresIn: '1hr' }
	);
};

module.exports = {
	createMessage,
	signToken,
};
