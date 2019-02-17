var Q = require('q');

var _ = require('underscore');

var examRepo = require('../repositories/exam.repository');

exports.getAllExam = (req, res) => {

    var deffered = Q.defer();

    examRepo.getAllExam(req.body, (error, result) => {
    console.log(JSON.stringify(result, undefined, 2));
    
        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get user details!!" });

        else
            deffered.resolve({ "status": 200, data: result, "message": "User details  fetched successfully!!" });
    });


    return deffered.promise;

};

exports.findSubjectByClass = (req, res) =>{
    var deffered = Q.defer();
    examRepo.findSubjectByClass(req.query, (error, result) => {
        console.log(JSON.stringify(result, undefined, 2));

            if (error)
                deffered.reject({ "status": 500, data: [], "message": "Unable to get subject!!" });
    
            else
                deffered.resolve({ "status": 200, data: result });
    });
    return deffered.promise;
};

exports.findQuestionByClassAndSubject = (req, res) =>{

    var deffered = Q.defer();
    // console.log(req.query.exam_class,' ---', req.query.exam_subject);
    examRepo.findQuestionByClassAndSubject(req.query, (error, result) => {
        // console.log(JSON.stringify(result, undefined, 2));

            if (error)
                deffered.reject({ "status": 500, data: [], "message": "Unable to get subject!!" });
    
            else
                deffered.resolve({ "status": 200, data: result });
    });
    return deffered.promise;

};

exports.save = (req, res) => {

    var deffered = Q.defer();
    
        examRepo.saveExam(req.body, (error, result) => {

                    if (error){
                        console.log(error);
                        deffered.reject({ "status": 500, data: [], "message": error });
                    }

                    else
                        deffered.resolve({ "status": 200, data: result, "message": "User created  successfully!!" });

                });



    return deffered.promise;
};

exports.getUserById = (req, res) => {

    var deffered = Q.defer();

    examRepo.getUserById(req.params.id, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User details fetched  successfully!!" });

    });

    return deffered.promise;

};

exports.updateUser = (req, res) => {

    var deffered = Q.defer();

    examRepo.updateUser(req.body, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User data updated  successfully!!" });
    });

    return deffered.promise;

};

exports.disableUser = (req, res) =>{

    var deffered = Q.defer();

    examRepo.disableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User disabled  successfully!!"  });   
    });

    return deffered.promise;

};

exports.enableUser = (req, res) =>{

    var deffered = Q.defer();

    examRepo.enableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User enabled  successfully!!"  });   
    });

    return deffered.promise;

};