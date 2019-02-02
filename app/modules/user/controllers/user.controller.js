var Q = require('q');

var _ = require('underscore');

var userRepo = require('../repositories/user.repository');

exports.getAllUsers = (req, res) => {

    var deffered = Q.defer();

    userRepo.getAllUsers(req.body, (error, result) => {

        if (error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get user details!!" });

        else
            deffered.resolve({ "status": 200, data: result, "message": "User details  fetched successfully!!" });
    });


    return deffered.promise;

};

exports.save = (req, res) => {

    var deffered = Q.defer();

    userRepo.getByField({ 'email': req.body.email, 'isDeleted': false }, function (err, result) {
        if (err) {
            deferred.reject({ "status": 500, data: [], "message": "Email already in use, please choose another email!" });
        } else {
            if (_.isEmpty(result)) {
                userRepo.saveUser(req.body, (error, result) => {

                    if (error){
                        console.log('LINE 37:: ');
                        console.log(error);
                        deffered.reject({ "status": 500, data: [], "message": error });
                    }

                      


                    else
                        deffered.resolve({ "status": 200, data: result, "message": "User created  successfully!!" });

                });
            } else {
                deffered.reject({ "status": 500, data: [], "message": "This email address already exists!" });
            }
        }
    });

    return deffered.promise;
};

exports.getUserById = (req, res) => {

    var deffered = Q.defer();

    userRepo.getUserById(req.params.id, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User details fetched  successfully!!" });

    });

    return deffered.promise;

};

exports.updateUser = (req, res) => {

    var deffered = Q.defer();

    userRepo.updateUser(req.body, (error, result) => {
        if (error)
            deffered.reject({ "status": 500, data: [], "message": error });


        else
            deffered.resolve({ "status": 200, data: result, "message": "User data updated  successfully!!" });
    });

    return deffered.promise;

};

exports.disableUser = (req, res) =>{

    var deffered = Q.defer();

    userRepo.disableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User disabled  successfully!!"  });   
    });

    return deffered.promise;

};

exports.enableUser = (req, res) =>{

    var deffered = Q.defer();

    userRepo.enableUser(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable user, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "User enabled  successfully!!"  });   
    });

    return deffered.promise;

};