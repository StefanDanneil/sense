'use strict'

const models = require('../models');

module.exports = function(apiRoutes){

	//**********************
	// GET routes
	//**********************
	apiRoutes.get('/devices', function(req, res) {
		models.device.findAll({where: {userId: req.userId}}).then( device => res.json(device) );
	});

	apiRoutes.get('/devices/:deviceId', function(req, res) {
		models.device.findOne({
			where: {
				id: req.params.deviceId
			}
		}).then( device => {
			if (device && ( device.id === req.deviceId || device.userId === req.userId)) {
				res.json(device)
			} else {
				res.json(null)
			}
		});
	});

	apiRoutes.get('/devices/:deviceId/measures', function(req, res) {
		models.device.findOne({
			where: {
				id: req.params.deviceId
			}
		}).then( device => {
			if (device && ( device.id === req.deviceId || device.userId === req.userId)) {
				device.getMeasures().then(measures => res.json(measures));
			} else {
				res.json(null)
			}
		});
	});

	//**********************
	// POST routes
	//**********************
	apiRoutes.post('/devices', function(req, res) {
		res.send('soon you can save devices here');
	});
};