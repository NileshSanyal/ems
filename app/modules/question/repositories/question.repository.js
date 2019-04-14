
// var User = require('../models/user.model');

const { Question } = require('../models/question.model');

const _ = require("underscore");

var questionRepository = {

    saveQuestion: (questionObj, cb) => {

            let question = new Question({
                question: questionObj.question,
                answer1: questionObj.answer1,
                answer2: questionObj.answer2,
                answer3: questionObj.answer3,                
                answer4: questionObj.answer4,
                correct_answer: questionObj.correct_answer,                
                subject_id: questionObj.subject_id,
                class_id: questionObj.class_id
            });

            question.save((err, questionObj) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, questionObj);
            });
        

    },

    getAllQuestion: (authors, cb) => {
        Question.find({}, (err, results) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, results);
        });
    },

    getByField: (params, cb) => {

        Question.findOne(params, function (err, result) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });
    },

    getQuestionById: (questionId, cb) => {

        Question.findById(questionId)
            .populate('class_id')
            .populate('subject_id')
            .exec((err, questionData) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, questionData);
            });

    },

    updateQuestion: (questionObj, cb) => {

            Question.findByIdAndUpdate(questionObj.questionIdVal,
                {
                        question: questionObj.question,
                        answer1: questionObj.answer1,
                        answer2: questionObj.answer2,
                        answer3: questionObj.answer3,                
                        answer4: questionObj.answer4,     
                        correct_answer: questionObj.correct_answer,             
                        subject_id: questionObj.subject_id,
                        class_id: questionObj.class_id
                
                }
                , (err, result) => {

                    if (err)
                        return cb(err, null);
                    else
                        return cb(null, result);

                });
        


    },

    enableQuestion: (questionData, cb) => {
        Question.findByIdAndUpdate(questionData.params.id, { isDeleted: false }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });
    },

    disableQuestion: (questionData, cb) => {

        Question.findByIdAndUpdate(questionData.params.id, { isDeleted: true }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });

    }

};
module.exports = questionRepository;