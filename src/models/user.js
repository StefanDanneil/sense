"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define("user", {
		userName : {
			type: DataTypes.STRING,
			allowNull: false
		},
		email : {
			type: DataTypes.STRING,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(password) {
				this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
			}
		}
	});

	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return User;
};