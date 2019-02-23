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
                        deffered.resolve({ "status": 200, data: result, "message": "User created  successfully!!" });

                });
            
        
    

    return deffered.promise;
};

exports.getQuestionById = (req, res) => {

    var deffered = Q.defer();

    questionRepo.getQuestionById(req.params.id, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User details fetched  successfully!!" });

    });

    return deffered.promise;

};

exports.updateUser = (req, res) => {

    var deffered = Q.defer();

    questionRepo.updateUser(req.body, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User data updated  successfully!!" });
    });

    return deffered.promise;

};

exports.disableUser = (req, res) =>{

    var deffered = Q.defer();

    questionRepo.disableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User disabled  successfully!!"  });   
    });

    return deffered.promise;

};

exports.enableUser = (req, res) =>{

    var deffered = Q.defer();

    questionRepo.enableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User enabled  successfully!!"  });   
    });

    return deffered.promise;

};