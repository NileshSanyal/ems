
// var User = require('../models/user.model');

const { User, validateUser } = require('../models/user.model');

const _ = require("underscore");

var userRepository = {

    saveUser: (userObj, cb) => {

        var subjects_taught;
        var class_attended;

        if (userObj.user_type == 'Student') {
            class_attended = userObj.class_attended;
            subjects_taught = undefined;
        } else if (userObj.user_type == 'Teacher') {
            subjects_taught = userObj.subjects_taught;
            class_attended = undefined;
        }

        const { error } = validateUser(userObj);

        let errorDetails;

        if (error) {
            errorDetails = error.message;
            return cb(errorDetails, null);
        }
        else {
            let user = new User({
                full_name: userObj.full_name,
                email: userObj.email,
                contact_no: userObj.contact_no,
                user_type: userObj.user_type,
                class_attended: class_attended,
                subjects_taught: subjects_taught
            });

            user.save((err, userObj) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, userObj);
            });
        }

    },

    getAllUsers: (authors, cb) => {
        User.find({}, (err, results) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, results);
        });
    },

    getByField: (params, cb) => {

        User.findOne(params, function (err, result) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });
    },

    getUserById: (userId, cb) => {

        User.findById(userId)
            .populate('class_attended')
            .populate('subjects_taught')
            .exec((err, userData) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, userData);
            });

    },

    updateUser: (userObj, cb) => {

        if (userObj.user_type == 'Student') {

            class_attended = userObj.class_attended;
            subjects_taught = undefined;


        } else if (userObj.user_type == 'Teacher') {
            subjects_taught = userObj.subjects_taught;
            class_attended = undefined;
        }

        const { error } = validateUser(userObj);

        let errorDetails;

        if (error) {
            errorDetails = error.message;
            return cb(errorDetails, null);
        }
        else {
            User.findByIdAndUpdate(userObj.userIdVal,
                {
                    full_name: userObj.full_name,
                    email: userObj.email,
                    contact_no: userObj.contact_no,
                    user_type: userObj.user_type,
                    class_attended: class_attended,
                    subjects_taught: subjects_taught

                }
                , (err, result) => {

                    if (err)
                        return cb(err, null);
                    else
                        return cb(null, result);

                });
        }


    },

    enableUser: (userData, cb) => {
        User.findByIdAndUpdate(userData.params.id, { isDeleted: false }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });
    },

    disableUser: (userData, cb) => {

        User.findByIdAndUpdate(userData.params.id, { isDeleted: true }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });

    }

};
module.exports = userRepository;