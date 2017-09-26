var fs = require('fs');
var util = require('util');
var promzard = require('promzard');

promzard('./src/config/config-template.js', null, function (er, data) {
	if (er) {
		return console.log(er);
	}

	var output = 'module.exports = ' + util.inspect(data) + ';';

	fs.writeFile('./src/config/config.js', output, function(err) {
		if (err) return console.log(err);

		console.log("Your config file has been successfully created!");
	});
});