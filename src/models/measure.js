"use strict";


module.exports = function(sequelize, DataTypes) {

	var Measure = sequelize.define("measure", {
		value: {
			type: DataTypes.FLOAT(8,2)
		}
	});

	return Measure;
};