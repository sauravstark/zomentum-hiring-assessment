const mongoose = require('mongoose');

const { db_uri } = require('../config');

module.exports.connect = function() {
	mongoose.connect(db_uri);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(){
	  console.log("It's alive! It's alive!");
	});
	return db;
}