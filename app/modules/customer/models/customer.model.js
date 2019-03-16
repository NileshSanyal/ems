var mongoose = require('mongoose');
// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports.Customer = Customer;