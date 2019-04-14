var Q = require('q');

var _ = require('underscore');

var questionRepo = require('../repositories/question.repository');

exports.getAllquestions = (req, res) => {

    var deffered = Q.defer();

    questionRepo.getAllQuestion(req.body, (error, result) => {

        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get user details!!" });

        else
            deffered.resolve({ "status": 200, data: result, "message": "QUestion details  fetched successfully!!" });
    });


    return deffered.promise;

};

exports.save = (req, res) => {

    var deffered = Q.defer();
    
            
                questionRepo.saveQuestion(req.body, (error, result) => {

                    if (error){
                        deffered.reject({ "status": 500, data: [], "message": error });
                    }

                    else
                        deffered.resolve({ "status": 200, data: result, "message": "Question created  successfully!!" });

                });
            
        
    

    return deffered.promise;
};

exports.getQuestionById = (req, res) => {

    var deffered = Q.defer();

    questionRepo.getQuestionById(req.params.id, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "Question details fetched  successfully!!" });

    });

    return deffered.promise;

};

exports.updateQuestion = (req, res) => {

    var deffered = Q.defer();

    questionRepo.updateQuestion(req.body, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "Question details updated successfully!!" });
    });

    return deffered.promise;

};

exports.disableQuestion = (req, res) =>{

    var deffered = Q.defer();

    questionRepo.disableQuestion(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable question, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Question disabled  successfully!!"  });   
    });

    return deffered.promise;

};

exports.enableQuestion = (req, res) =>{

    var deffered = Q.defer();

    questionRepo.enableQuestion(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable question, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Question enabled  successfully!!"  });   
    });

    return deffered.promise;

};