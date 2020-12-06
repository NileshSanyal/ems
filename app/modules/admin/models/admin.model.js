var mongoose = require('mongoose');
const Joi = require('joi');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var adminuserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verify_code: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isVerifed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
});



adminuserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

adminuserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

function validateAdminUser(adminuserObj) {
  const adminUserSchema = Joi.object().keys({
    username: Joi.string().required().error(new Error('Username can not be empty')),
    password: Joi.string().required().error(new Error('Password can not be empty')),
    email: Joi.string().required().email().error(new Error('Invalid Email address')),
    confirm_password: Joi.string(),
    verify_code: Joi.string()
  });

  return Joi.validate(adminuserObj, adminUserSchema);
}

var Adminuser = mongoose.model('Adminuser', adminuserSchema);

module.exports.Adminuser = Adminuser;
module.exports.validateAdminUser = validateAdminUser;