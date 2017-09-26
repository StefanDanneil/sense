(function(){
	const express = require('express');
	const helmet = require('helmet');
	const bodyParser = require('body-parser');
	const morgan = require('morgan');
	const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
	const config = require('./config'); // get our config file
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

	// =======================
	// routes ================
	// =======================
	// basic route
	app.get('/', function(req, res) {
		res.send('SUP mafacka!?');
	});

	// API ROUTES -------------------

	// get an instance of the router for api routes
	var apiRoutes = express.Router();

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRoutes.post('/authenticate', function(req, res) {
		// find the user
		models.user.findOne({
			where: {userName : req.body.name}
		}).then( user => {
			if (!user) {
		  		res.json({ success: false, message: 'Authentication failed. User not found.' });
		  	} else if (user) {

				// check if password matches
				if (!user.validPassword(req.body.password)) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {

					// if user is found and password is right
					// create a token
					var token = jwt.sign(user.dataValues, app.get('secret'), {
						expiresIn: '2h'
					});

					// return the information including token as JSON
					res.json({
						success: true,
						token: token
					});
				}
			}
		});
	});

	// route middleware to verify a token
	apiRoutes.use(function(req, res, next) {
 		middleware.validateToken(req, res, next);
	});

	apiRoutes.get('/users', function(req, res) {
		models.user.findAll({where: {id: req.userId}}).then( users => res.json(users) );
	});

	apiRoutes.get('/users/:userId', function(req, res) {
		models.user.findOne({
			where: {id: req.params.userId}
			}).then( user => res.json(user) );
	});

	apiRoutes.post('/users', function(req, res) {

		res.send('soon you can save users here');
	});

	apiRoutes.get('/devices', function(req, res) {
		models.device.findAll({where: {userId: req.userId}}).then( device => res.json(device) );
	});

	apiRoutes.post('/devices', function(req, res) {
		res.send('soon you can save devices here');
	});

	apiRoutes.get('/measures', function (req, res) {
		models.device.findAll({where: {userId: req.userId}})
			.then( devices => {
				deviceIds = devices.map(device => device.id)

				models.measure.findAll({where: {deviceId: deviceIds}})
					.then( measures => res.json(measures))
			} )
	});

	apiRoutes.post('/measures', function (req, res) {
		res.send('soon you can save measures here');
	});

	app.use('/api', apiRoutes);

	// =======================
	// start the server ======
	// =======================
	models.sequelize.sync({force: true}).then(
		() => {
			models.user.create({
				userName : 'stefanKarlsson',
				password : 'hejhej',
				email : 'karlssonstefan88@gmail.com'
			})

			models.device.create({
				location: 'garderoben',
				name: 'StefansDevice',
				password: 'ndm1',
				userId: 1
			})

			models.device.create({
				location: 'hemma',
				name: 'StefansAndraDevice',
				password: 'ndm234',
				userId: 1
			})

			models.measureType.create({
				name: 'Temperature'
			});

			models.measureType.create({
				name: 'Humidity'
			});

			models.measure.create({
				value: 0.5,
				measureTypeId: 1,
				deviceId: 1
			})

			models.measure.create({
				value: 24.5,
				measureTypeId: 1,
				deviceId: 1
			})

			models.measure.create({
				value: 100023.1,
				measureTypeId: 1,
				deviceId: 1
			})

			models.measure.create({
				value: 23.1,
				measureTypeId: 1,
				deviceId: 2
			})

			models.user.create({
				userName : 'natalieWahlstrom',
				password : 'hejhej2',
				email : 'natalie.wahlstrom@gmail.com'
			})

			models.device.create({
				location: 'blommorna',
				name: 'NataliesDevice',
				password: 'ndm1',
				userId: 2
			})

			models.device.create({
				location: 'balkongen',
				name: 'NataliesAndraDevice',
				password: 'ndm234',
				userId: 2
			})

			models.measure.create({
				value: 22.5,
				measureTypeId: 1,
				deviceId: 3
			})

			models.measure.create({
				value: 24.5,
				measureTypeId: 1,
				deviceId: 3
			})

			models.measure.create({
				value: 23.1,
				measureTypeId: 1,
				deviceId: 3
			})

			models.measure.create({
				value: 23.1,
				measureTypeId: 1,
				deviceId: 4
			})

		}

		// models.user.findOne({
		// 	where: {
		// 		userName : 'stefanKarlsson'
		// 	}
		// }).then( (user) => user.getDevices().then( (devices) => console.log(devices) ))


		).then(function(){
		app.listen(port);
		console.log('Magic happens at http://localhost:' + port);
	});
})();