'use strict'

const models = require('../models');

module.exports = function(apiRoutes){

	apiRoutes.get('/measures', function (req, res) {
		models.device.findAll({where: {userId: req.userId}})
			.then( devices => {
				var deviceIds = devices.map(device => device.id)
				models.measure.findAll({where: {deviceId: deviceIds}})
					.then( measures => res.json(measures))
			} )
	});

	apiRoutes.post('/measures', function (req, res) {
		res.send('soon you can save measures here');
	});

};