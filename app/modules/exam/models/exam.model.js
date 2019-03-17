var mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
var Schema = mongoose.Schema;

var examSchema = new Schema({
  exam_name: { type: String, required: true },
  exam_type: { type: String,default: 'one', enum: ['one', 'multiple'], required: true },
  exam_date: { type: Date, required: true }, 
  exam_subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  class_name: { type: Schema.Types.ObjectId, ref: 'Class' },
  questions: [ { type: Schema.Types.ObjectId, ref: 'Question' } ],
  exam_date: { type: String },
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Exam = mongoose.model('Exam', examSchema);

// function validateUser(userObj) {
//   const examSchema = Joi.object().keys({

//     full_name: Joi.string().required().error(new Error('Full name can not be left empty')),
//     email: Joi.string().required().email().error(new Error('Invalid Email address')),
//     contact_no: Joi.string().regex(/^(\+\d{1,3}[789]\d{9})|([789]\d{9})|([0]\d{9})$/).error(new Error('Invalid Contact number')),
//     class_attended: Joi.objectId().required(),
//     subjects_taught: Joi.array().items(Joi.objectId().required()),
//     user_type: Joi.string().required().error(new Error('Select at least one user type'))
//   });

//   return Joi.validate(userObj, examSchema);
// }

module.exports.Exam = Exam;
// module.exports.validateUser = validateUser;