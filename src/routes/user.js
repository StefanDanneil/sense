'use strict'

const models  = require('../models');

module.exports = function(apiRoutes) {
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
};