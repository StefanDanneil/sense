'use strict'

const models = require('../models');

module.exports = function(apiRoutes){
	apiRoutes.get('/devices', function(req, res) {
		models.device.findAll({where: {userId: req.userId}}).then( device => res.json(device) );
	});

	apiRoutes.post('/devices', function(req, res) {
		res.send('soon you can save devices here');
	});
};