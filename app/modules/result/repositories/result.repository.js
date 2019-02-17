
// var User = require('../models/user.model');

const { Result } = require('../models/result.model');

const _ = require("underscore");

var userRepository = {

    saveExam: (examObj, cb) => {


      
            let result = new Result({
                result_name:examObj.result_name,
                result_type:examObj.result_type,
                result_date:examObj.result_date
                
            });

            result.save((err, examObj) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, examObj);
            });
       

    },

    getAllExam: (authors, cb) => {
        Exam.find({}, (err, results) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, results);
        });
    },

    getByField: (params, cb) => {

        Exam.findOne(params, function (err, result) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });
    },

    getUserById: (userId, cb) => {

        Exam.findById(userId)
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
            Exam.findByIdAndUpdate(userObj.userIdVal,
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
        Exam.findByIdAndUpdate(userData.params.id, { isDeleted: false }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });
    },

    disableUser: (userData, cb) => {

        Exam.findByIdAndUpdate(userData.params.id, { isDeleted: true }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });

    }

};
module.exports = userRepository;