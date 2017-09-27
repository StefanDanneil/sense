'use strict'

const models = require('../models');
const jwt = require('jsonwebtoken');

module.exports = function(apiRoutes, app){
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
};