var mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // added later
var Schema = mongoose.Schema;

var classSchema = new Schema({
  class_name: { type: String, required: true },
  description: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Class = mongoose.model('Class', classSchema);

function validateClass(classObj) {
  const classSchema = Joi.object().keys({
    classIdVal: Joi.objectId(),
    
    // class_name: Joi.string().required().error(new Error('Class name can not be left empty')),
    // class_description: Joi.string().required().error(new Error('Description can not be left empty'))


    class_name: Joi.string().required(),
    class_description: Joi.string().required()


    
  });  

  return Joi.validate(classObj, classSchema, {abortEarly: false});
}

module.exports.Class = Class;
module.exports.validateClass = validateClass;
