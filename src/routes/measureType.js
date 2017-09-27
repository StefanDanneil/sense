'use strict'

const models = require('../models');

module.exports = function(apiRoutes) {
	apiRoutes.get('/measuretypes', function (req, res) {
		console.log(models);
		models.measureType.findAll()
			.then(measureTypes => res.json(measureTypes));
	});

	apiRoutes.post('/measuretypes', function (req, res) {
		res.send('soon you can save measurestypes here');
	});
}