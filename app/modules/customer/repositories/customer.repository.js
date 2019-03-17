
// var User = require('../models/user.model');

 const { Exam } = require('../../exam/models/exam.model');

const { User } = require('../../user/models/user.model');

const _ = require("underscore");

const mongoose = require('mongoose');

var customerRepository = {

    getExamDetails: (customerObj, cb) => {
            // console.log('Line 13 customer repository:: ', JSON.stringify(customerObj, undefined, 2));
            const customerId = customerObj._id;
            // console.log('Line 15 customer repo:: ',  typeof(customerId));

            // get student data
            User.findById(customerId)
            .populate('allotted_exams')
            .exec((err, studentExamData) => {
                if (err) {
                    console.log('Error!!: ',err);
                    return cb(err, null);
                }
                else{
                    console.log(studentExamData);
                    return cb(null, studentExamData);
                }
            });
            // end 
    }

};
module.exports = customerRepository;