(function(){
	const express = require('express');
	const helmet = require('helmet');
	const bodyParser = require('body-parser');
	const morgan = require('morgan');
	const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
	const config = require('./config/config'); // get our config file
	const middleware = require('./middleware/middleware'); // get our config file

	const app = express();
	const models  = require('./models');

	// =======================
	// configuration =========
	// =======================
	var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
	app.set('secret', config.secret); // secret variable

	// use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// use morgan to log requests to the console
	app.use(morgan('dev'));
	app.use(helmet());

	// API ROUTES -------------------

	// get an instance of the router for api routes
	var apiRoutes = express.Router();

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	require('./auth/authenticate')(apiRoutes, app);

	// route middleware to verify a token
	apiRoutes.use(function(req, res, next) {
 		middleware.validateToken(req, res, next);
	});

	require('./routes')(apiRoutes);

	app.use('/api', apiRoutes);

	// =======================
	// start the server ======
	// =======================
	models.sequelize.sync()
		.then(
			() => {
				require('./dbseed')();
			})
		.then(function(){
			app.listen(port);
			console.log('Magic happens at http://localhost:' + port);
		});
})();