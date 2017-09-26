"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

	var MeasureType = sequelize.define("measureType", {
		name : {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return MeasureType;
};