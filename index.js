const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//MODULES
const productRouter = require('./src/routers/product');
const userRouter = require('./src/routers/user');

const app = express();
const port = process.env.PORT;

//PASSPORT CONFIG
require('./src/utils/passport-config');

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES
app.use(userRouter);
app.use(productRouter);

//DB connection
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(connection) => {
		try {
			app.listen(port, (result) => {
				console.log('server started on port', port);
			});
		} catch (err) {
			throw err;
		}
	}
);
