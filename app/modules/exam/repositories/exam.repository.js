
// var User = require('../models/user.model');

const { Exam } = require('../models/exam.model');

const { Question } = require('../../question/models/question.model');

const _ = require("underscore");

const mongoose = require('mongoose');

var userRepository = {

    saveExam: (examObj, cb) => {

            // need to add question id's as array
            /*
                {"exam_name":"TEST","exam_type":"one","class_name":"5c19dcc641a1900480e9cc61","exam_subject":"5c1a5eb7fa811426f0424f9c","exam_date":"2019-01-23"}

            */

            console.log(JSON.stringify(examObj));
            let exam = new Exam({
                exam_name:examObj.exam_name,
                exam_type:examObj.exam_type,
                exam_date:examObj.exam_date,
                exam_subject:examObj.exam_subject,
                class_name:examObj.exam_class,
                exam_date:examObj.exam_date,
                questions:examObj.questions_set
            });

            exam.save((err, examObj) => {
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

    findSubjectByClass: (classId, cb) => {

        // console.log(classId.exam_class);

        let class_id = classId.exam_class;

        Question.find({class_id: class_id}, 'subject_id')
                .populate('subject_id')
                .exec((err, results) => {
                    if (err)
                        return cb(err, null);
                    else
                        return cb(null, results);
                });

    },

    findQuestionByClassAndSubject: (examObj, cb) => {

        let examClassName = examObj.exam_class;
        let examSubjectName = examObj.exam_subject;

        // console.log(JSON.stringify(examObj, undefined, 2));

        // Question.find({exam_class: examClassName,exam_subject: examSubjectName}, function (err, results) {
        //     console.log(JSON.stringify(results, undefined, 2));
        //     if (err)
        //         return cb(err, null);
        //     else
        //         return cb(null, results);
        // });  


        Question.find({class_id: examClassName,subject_id: examSubjectName })
                .exec((err, results) => {
                    // console.log(JSON.stringify(results, undefined, 2));
                    if (err)
                        return cb(err, null);
                    else
                        return cb(null, results);
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