const path = require('path');

//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const multer = require('multer');

//MODULES
const productRouter = require('./src/routers/product');
const userRouter = require('./src/routers/user');

const app = express();
const port = process.env.PORT;

//PASSPORT CONFIG
require('./src/utils/passport-config');

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES
app.use(userRouter);
app.use(productRouter);

/**Multer */
app.use('/uploads', express.static(path.join(__dirname, './src/uploads')));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads');
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
	try {
		return res.status(201).json({
			message: 'File uploaded successfully',
		});
	} catch (error) {
		console.error(error);
	}
});

/**Multer */

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
