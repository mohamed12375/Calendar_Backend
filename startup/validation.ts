const Joi2 = require('joi');

module.exports = function() {
  Joi2.objectId = require('joi-objectid')(Joi2);
}