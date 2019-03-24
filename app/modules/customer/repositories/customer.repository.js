
// var User = require('../models/user.model');

const { Exam } = require('../../exam/models/exam.model');

const { User } = require('../../user/models/user.model');

const { ExamPerformance } = require('../models/exam_performance.model');

const _ = require("underscore");

const mongoose = require('mongoose');

var customerRepository = {

    getExamDetails: (customerObj, cb) => {
            // console.log('Line 13 customer repository:: ', JSON.stringify(customerObj, undefined, 2));
            const customerId = customerObj._id;
            
             // get student data
            User.findById(customerId)
            .populate({ 
                path: 'allotted_exams',
                populate: {
                  path: 'exam_subject',
                  model: 'Subject',
                  populate: {
                      path: 'class',
                      model: 'Class'
                  }
                } 
             })
            .exec((err, studentExamData) => {
                if (err) {
                    console.log('Error!!: ',err);
                    return cb(err, null);
                }
                else
                    return cb(null, studentExamData);
                
            });
            // end

    },

    getQuestionsByExamId: (examId, cb) => {

        // get all questions alongwith their options
        Exam
            .findById(examId)
            .populate('questions')
            .exec((err, examData) => {
                if (err) {
                    console.log('Error!!: ', err);
                    return cb(err, null);
                }
                else {
                    // console.log(JSON.stringify(examData, undefined, 2));
                    return cb(null, examData);
                }
            });
        // end

    },

    finishExam: (finishedExmObj, cb) => {
        // console.log('Line 67: customer repository');
        // console.log(JSON.stringify(finishedExmObj, undefined, 2));

        /*
            {
                "question_answer_details": [
                    {
                    "question_id": "5c70d41ac9307e0468851ed0",
                    "answer_given": "It is a logical way to connect multiple tables by unique key/keys."
                    },
                    {
                    "question_id": "5c70e516a4d11129d83855f2",
                    "answer_given": "Table is a logical unit."
                    }
                ],
                "student_id": "5c8a71a2107905205c530014",
                "exam_id": "5c7172cad349cd185c687f15"
            }

        */

        let exmPerf = new ExamPerformance({
            student_id: finishedExmObj.student_id,
            exam_id: finishedExmObj.exam_id,
            exam_details: finishedExmObj.exam_details,
            question_answer_details: finishedExmObj.question_answer_details
        });

        exmPerf.save((err, exmPrfObj) => {
            if (err)
                return cb(err, null);
            else
                return cb(null, 'Exam finished successfully!');
        });
    }

};
module.exports = customerRepository;