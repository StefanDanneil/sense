"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config/config.js'));

var sequelize = new Sequelize('mysql://'+config.db.user+':'+config.db.password+'@'+config.db.host+'/'+config.db.db);

var db        = {};

//autoload all models in the model folder
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

//setup db relations
db.user.hasMany(db.device);
db.device.belongsTo(db.user);

db.device.hasMany(db.measure);
db.measure.belongsTo(db.device);

db.measure.belongsTo(db.measureType);

//allow access to sequelize through the exported object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;