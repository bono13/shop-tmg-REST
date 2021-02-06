const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json('testing...');
});

//DB connection
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(connection) => {
		// When connection is made try starting the server
		try {
			app.listen(port, (result) => {
				console.log('server started on port', port);
			});
		} catch (err) {
			throw err;
		}
	}
);
