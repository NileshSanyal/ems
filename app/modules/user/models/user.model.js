var mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
var Schema = mongoose.Schema;

var userSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: String, required: true },
  user_type: { type: String, default: 'Student', enum: ['Student', 'Teacher', 'Non-teaching-staff'], required: true },
  class_attended: { type: Schema.Types.ObjectId, ref: 'Class' },
  subjects_taught: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

function validateUser(userObj) {
  const userSchema = Joi.object().keys({

    // full_name: Joi.string().required().error(new Error('Full name can not be left empty')),
    // email: Joi.string().required().email().error(new Error('Invalid Email address')),
    // contact_no: Joi.string().regex(/^(\+\d{1,3}[789]\d{9})|([789]\d{9})|([0]\d{9})$/).error(new Error('Invalid Contact number')),
    class_attended: Joi.objectId().required(),
    subjects_taught: Joi.array().items(Joi.objectId().required()),
    // user_type: Joi.string().required().error(new Error('Select at least one user type'))

    full_name: Joi.string().required(),
    email: Joi.string().required().email(),
    contact_no: Joi.string().regex(/^(\+\d{1,3}[789]\d{9})|([789]\d{9})|([0]\d{9})$/),
    user_type: Joi.string().required()


  });

  return Joi.validate(userObj, userSchema, {abortEarly: false});
}

module.exports.User = User;
module.exports.validateUser = validateUser;