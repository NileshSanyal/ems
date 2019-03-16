
// var User = require('../models/user.model');

const { Customer } = require('../models/customer.model');

const _ = require("underscore");

const mongoose = require('mongoose');

var customerRepository = {

    saveCustomer: (customerObj, cb) => {

            // let exam = new Exam({
            //     exam_name:examObj.exam_name,
            //     exam_type:examObj.exam_type,
            //     exam_date:examObj.exam_date,
            //     exam_subject:examObj.exam_subject,
            //     class_name:examObj.exam_class,
            //     exam_date:examObj.exam_date,
            //     questions:examObj.questions_set
            // });

            // exam.save((err, examObj) => {
            //     if (err)
            //         return cb(err, null);
            //     else
            //         return cb(null, examObj);
            // });
       

    }

};
module.exports = customerRepository;