"use strict";

module.exports = function(sequelize, DataTypes) {

	var MeasureType = sequelize.define("measureType", {
		name : {
			type: DataTypes.STRING,
			allowNull: false
		},
		suffix: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});

	return MeasureType;
};