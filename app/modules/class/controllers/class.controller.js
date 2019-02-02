var Q = require('q');

var classRepo = require('../repositories/class.repository');

exports.getAllClasses = (req, res) =>{

    var deffered = Q.defer();

    classRepo.getAllClasses({}, (error, result) =>{

        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get class details!!"  });
        
        else
            deffered.resolve({ "status": 200, data: result, "message": "Class details fetched successfully!!"  }); 
    });


    return deffered.promise;

};

exports.save = (req, res) =>{

    var deffered = Q.defer();

    classRepo.saveClass(req.body, (error, result) =>{
        
        if(error)
            deffered.reject({ "status": 500, data: [], "message": error  });
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Class created successfully!!"  });    

    });

    return deffered.promise;
};

exports.getClassById = (req, res) =>{

    var deffered = Q.defer();

    classRepo.getClassById(req.params.id, (error, result) =>{

        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to get edit class information, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Class details fetched  successfully!!"  });   

    });

    return deffered.promise;

};

exports.updateClass = (req, res) =>{

    var deffered = Q.defer();

    classRepo.updateClass(req.body, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": error  });
        
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Class data updated  successfully!!"  });   
    });

    return deffered.promise;

};

exports.disableClass = (req, res) =>{

    var deffered = Q.defer();

    classRepo.disableClass(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to disable class, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Class disabled  successfully!!"  });   
    });

    return deffered.promise;

};

exports.enableClass = (req, res) =>{

    var deffered = Q.defer();

    classRepo.enableClass(req, (error, result) =>{
        if(error)
            deffered.reject({ "status": 500, data: [], "message": "Unable to enable class, please try again later!!"  });
        
            
        else    
            deffered.resolve({ "status": 200, data: result, "message": "Class enabled  successfully!!"  });   
    });

    return deffered.promise;

};