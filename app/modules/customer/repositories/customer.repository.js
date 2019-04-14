
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

        // prev working code without conditions 

        /* let exmPerf = new ExamPerformance({
            student_id: finishedExmObj.student_id,
            exam_details: finishedExmObj.exam_details,
            question_answer_details: finishedExmObj.question_answer_details
        });

        exmPerf.save((err, exmPrfObj) => {
            if (err)
                return cb(err, null);
            else
                return cb(null, 'Exam finished successfully!');
        }); */

        // end prev working code without conditions 

         /*
            Intended output for saving document in mongodb
            {
                "exam_details": [
                    {
                        "exam_status": "Started",
                        "exam_start_time": "2019-03-30T15:23:56.467Z",
                        "exam_end_time": "2019-03-30T15:23:56.467Z",
                        "time_spent_by_student": "",
                        "exam_id": "5c7172cad349cd185c687f15"
                    }
                ],
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
                "student_id": "5c8a71a2107905205c530014"
            }


        */


        // another approach
        ExamPerformance.findOneAndUpdate(
            { student_id: finishedExmObj.student_id }, 
            { $push: { exam_details: finishedExmObj.exam_details, question_answer_details: finishedExmObj.question_answer_details } },
            function(err, doc) {
                if (doc)
                    return cb(err, null);
                else{
                    let exmPerf;
                    // insert

                    if (typeof finishedExmObj.question_answer_details !== 'undefined' && finishedExmObj.question_answer_details.length > 0) {
                        exmPerf = new ExamPerformance({
                            student_id: finishedExmObj.student_id,
                            exam_details: finishedExmObj.exam_details,
                            question_answer_details: finishedExmObj.question_answer_details
                        });
                    }

                    else {
                        exmPerf = new ExamPerformance({
                            student_id: finishedExmObj.student_id,
                            exam_details: finishedExmObj.exam_details
                        });
                    }

                    
            
                    exmPerf.save((err, exmPrfObj) => {
                        if (err)
                            return cb(err, null);
                        else
                            return cb(null, 'Exam finished successfully!');
                    });
                }
                    // return cb(null, 'Exam finished successfully!');
            }
        );
        // end another approach


        // check if data already exists for a student, if so update collection, otherwise insert

        /* ExamPerformance
            .findOne({student_id: finishedExmObj.student_id}, function(err, docs) {
                if(docs) {
                    console.log('If block');
                    console.log('Modified obj: ');
                    console.log('===========');
                    console.log(JSON.stringify(finishedExmObj, undefined, 2));
                    console.log('===========');
                    // let exmPerf = new ExamPerformance();

                    // update subdocuments (exam_details array and question_answer_details array) accordingly
                    docs.exam_details.push(finishedExmObj.exam_details);
                    docs.question_answer_details.push(finishedExmObj.question_answer_details);
                    docs.save((err, docs) => {
                        if (err)
                            return cb(err, null);
                        else
                            return cb(null, 'Exam finished successfully!');
                    });
                }

                else {
                    console.log('Else block');
                    let exmPerf = new ExamPerformance({
                        student_id: finishedExmObj.student_id,
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
            }); */

    }

};
module.exports = customerRepository;