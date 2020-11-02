const DB = require('./db.js');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate'); 



module.exports = {
	db: DB,
	increment: autoIncrement,
	mongoose: mongoose,
	paginate: mongoosePaginate
}