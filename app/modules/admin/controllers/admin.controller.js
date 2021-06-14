var Q = require('q');

var adminUserRepo = require('../repositories/adminuser.repository');


exports.saveadmin = (req, res) =>{

    var deffered = Q.defer();

    adminUserRepo.saveadmin(req.body, (error, result) =>{
        
        if(error)
            deffered.reject({ "status": 500, data: [], "message": error  });
        else    
            deffered.resolve({ "status": 200, data: result, "message": result  });    

    });
    console.log('test');
    return deffered.promise;
};


exports.verifyadmin = (req, res) =>{

    var deffered = Q.defer();
    adminUserRepo.verifyadmin(req, (success, result) =>{
        if(success)
            deffered.reject({"status": 200, "message": success});
        else
            deffered.resolve({"status": 409, "message": result});
    });


    return deffered.promise;
};