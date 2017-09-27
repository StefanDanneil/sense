"use strict";
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

	var Device = sequelize.define("device", {
		location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(password) {
				this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
			}
		}

	});

	Device.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return Device;
};