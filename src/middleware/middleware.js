'use strict'
const config = require('../config/config'); // get our config file
const jwt = require('jsonwebtoken');

const Middleware = function() {

	var getToken = function(req) {
		return req.body.token || req.query.token || req.headers['x-access-token'];
	}

	this.validateToken = function (req, res, next) {
		// check header or url parameters or post parameters for token
		var token = getToken(req);

		  // decode token
		  if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, config.secret, function(err, decoded) {
		    	if (err) {
		    		return res.json({ success: false, message: 'Failed to authenticate token.' });
		    	} else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;

        		if (req.decoded.user) {
        			req.userId = decoded.user.id;
        		}

        		if (req.decoded.device) {
        			req.deviceId = decoded.device.id;
        		}

		        next();
		    }
		});

		} else {

		    // if there is no token
		    // return an error
		    return res.status(403).send({
		    	success: false,
		    	message: 'No token provided.'
		    });

		}
	}
}

module.exports = new Middleware();