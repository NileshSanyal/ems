var Q = require('q');

var _ = require('underscore');

var customerRepo = require('../repositories/customer.repository');

exports.getExamDetails = (req, res) => {

        var deffered = Q.defer();

        customerRepo.getExamDetails(req, (error, result) =>{
            if(error)
                deffered.reject({"status": 200, "message": error});
            else
                deffered.resolve({"status": 409, "message": result});
        });

        return deffered.promise;


};

exports.getQuestionsByExamId = (req, res) => {
    var deffered = Q.defer();

    customerRepo.getQuestionsByExamId(req, (error, result) => {
        if(error)
            deffered.reject({"status": 200, "message": error});
        else
            deffered.resolve({"status": 409, "data": result});
    });

    return deffered.promise;
};

exports.finishExam = (req, res) => {

    var deffered = Q.defer();

    customerRepo.finishExam(req, (error, result) => {
        
        if(error)
            deffered.reject({"status": 200, "message": error});
        else
            deffered.resolve({"status": 409, "successMsg": result});
    });

    return deffered.promise;

};

exports.getQuestionAnswerDetailsByStudentId = (req, res) => {

    var deffered = Q.defer();

    customerRepo.getQuestionAnswerDetailsByStudentId(req, (error, result) => {
        if(error)
            deffered.reject({"status": 200, "message": error});
        else
            deffered.resolve({"status": 409, "successMsg": result});
        
    });

    return deffered.promise;

};
