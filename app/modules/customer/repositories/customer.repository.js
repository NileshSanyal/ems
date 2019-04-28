
// var User = require('../models/user.model');

const { Exam } = require('../../exam/models/exam.model');

const { User } = require('../../user/models/user.model');

const { ExamPerformance } = require('../models/exam_performance.model');

const _ = require("underscore");

const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

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
            }
        );
    },

    getQuestionAnswerDetailsByStudentId: (studentExamObj, cb) => {
        let jsonObj = {};
        let jsonArray = [];
        jsonObj = { jsonArray };
        let jsonData = '';
        const examId = studentExamObj.examId;

        ExamPerformance
            .findOne({student_id: studentExamObj.studentId  }, 'question_answer_details -_id')
            .exec((err, qaDetails) => {
                if (err) {
                    console.log('Error!!: ', err);
                    return cb(err, null);
                }
                else {
                    // console.log(JSON.stringify(qaDetails, undefined, 2));


                   jsonData = jsonObj;
                // jsonData = JSON.stringify(qaDetails, null, 2);

                    // get questions from exam collection
                    Exam.findById(examId)
                    .populate('questions')
                    .exec((err, questions) => {
                        if (err)
                            return cb(err, null);
                        else {

                            /* qaDetails["question_answer_details"].forEach(function(qObj){ 
                                if(qObj.question_id === questions[0]._id) {
                                    console.log('Question id matched');
                                }
                            }); */


                            // console.log(JSON.stringify(questions["questions"], null, 2));

                            let questionArr = [];
                            let count = 0;
                            questionArr = questions["questions"];
                            console.log('Questions array: ', questionArr);
                            // questionArr.forEach(function(qElement) {
                                for(var i in questionArr) {
                                    var qElement = questionArr[i];
                                    
                                count++;
                                console.log(qElement);
                                // console.log('Question id: ',qElement._id);
                                // console.log('Correct answer: ', qElement.correct_answer);
                                // jsonData["question_id"] = '';
                                
                                // jsonData["question_id"] = qElement._id.toString();
                                // jsonData["correct_answer"] = qElement.correct_answer.toString();
                                // jsonData["id"] = count;

                                jsonData["question_id"].push(qElement._id.toString());
                                jsonData["correct_answer"].push(qElement.correct_answer.toString());


                               /*  qaDetails["question_answer_details"].forEach(function (key) {

                                    if(key.question_id.toString() == qElement._id.toString()) {
                                        // add correct answer key to the json array for appropriate qId key
                                        jsonData["question_answer_details"]["question_id"]["correct_answer"] = '';
                                        jsonData["question_answer_details"]["question_id"]["correct_answer"] = qElement.correct_answer;
                                        console.log('Found match for key_qId', key.question_id, ' with qElement_qId ', qElement._id);
                                    }
                                 }); */

                                 fs.writeFile(path.join(__dirname, 'student_result.json'), JSON.stringify(jsonData, undefined, 2), (err) => {
                                    if (err) 
                                        console.log(err);
                                    else
                                        console.log('Data written to file');
                                });

                            // }); 
                                }

                            return cb(null, questions);
                        }
                            
                    });
                    // end
                    

                    // console.log(JSON.stringify(qaDetails, null, 2));
                    return cb(null, qaDetails);
                }
        });

        cb(null, 'Exam result published!!');

    }

};
module.exports = customerRepository;