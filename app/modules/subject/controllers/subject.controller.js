var Q = require('q');


var subjectRepo = require('../repositories/subject.repository');

exports.getAllSubjects = (req, res) => {

    var deffered = Q.defer();

    subjectRepo.getAllSubjects({}, (error, result) => {

        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get class details!!" });

        else
            deffered.resolve({ "status": 200, data: result, "message": "Class details  fetched successfully!!" });
    });


    return deffered.promise;

};

exports.save = (req, res) => {

    var deffered = Q.defer();

    // console.log(JSON.stringify(req.body, undefined, 2));

    subjectRepo.saveSubject(req.body, (error, result) =>{

        if(error)
            deffered.reject({ "status": 500, data: [], "message": error  });


        else    
            deffered.resolve({ "status": 200, data: result, "message": "Subject created  successfully!!"  });    

    });

    return deffered.promise;
};

exports.getSubjectById = (req, res) => {

    var deffered = Q.defer();

    subjectRepo.getSubjectById(req.params.id, (error, result) => {

        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get edit subject information, please try again later!!" });


        else
            deffered.resolve({ "status": 200, data: result, "message": "Subject details fetched  successfully!!" });

    });

    return deffered.promise;

};

exports.updateSubject = (req, res) => {

    var deffered = Q.defer();

    subjectRepo.updateSubject(req.body, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });

        else
            deffered.resolve({ "status": 200, data: result, "message": "Subject data updated  successfully!!" });
    });

    return deffered.promise;

};

exports.disableSubject = (req, res) => {

    var deffered = Q.defer();

    subjectRepo.disableSubject(req, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable subject, please try again later!!" });


        else
            deffered.resolve({ "status": 200, data: result, "message": "Subject disabled  successfully!!" });
    });

    return deffered.promise;

};

exports.enableSubject = (req, res) => {

    var deffered = Q.defer();

    subjectRepo.enableSubject(req, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable subject, please try again later!!" });


        else
            deffered.resolve({ "status": 200, data: result, "message": "Subject enabled  successfully!!" });
    });

    return deffered.promise;

};
