var mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question: { type: String, required: true },
  answer1: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String, required: true },
  answer4: { type: String, required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
  subject_id: { type: Schema.Types.ObjectId, ref: 'Subject' },
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Question = mongoose.model('Question', questionSchema);

// function validateUser(userObj) {
//   const questionSchema = Joi.object().keys({

//     full_name: Joi.string().required().error(new Error('Full name can not be left empty')),
//     email: Joi.string().required().email().error(new Error('Invalid Email address')),
//     contact_no: Joi.string().regex(/^(\+\d{1,3}[789]\d{9})|([789]\d{9})|([0]\d{9})$/).error(new Error('Invalid Contact number')),
//     class_attended: Joi.objectId().required(),
//     subjects_taught: Joi.array().items(Joi.objectId().required()),
//     user_type: Joi.string().required().error(new Error('Select at least one user type'))
//   });

//   return Joi.validate(userObj, questionSchema);
// }

module.exports.Question = Question;
// module.exports.validateUser = validateUser;