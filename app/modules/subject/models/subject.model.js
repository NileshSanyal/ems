var mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

var Schema = mongoose.Schema;

var subjectSchema = new Schema({
  subject_name: {type: String, required: true},
  class: {type: Schema.Types.ObjectId, ref: 'Class', required: true},
  isDeleted: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

var Subject = mongoose.model('Subject', subjectSchema);

function validateSubject(subjectObj) {
  const subjectSchema = Joi.object().keys({

    subject_name: Joi.string().required().error(new Error('Subject name can not be left empty')),
    class: Joi.objectId()

  });

  return Joi.validate(subjectObj, subjectSchema);
}

module.exports.Subject = Subject;
module.exports.validateSubject = validateSubject;