var Q = require('q');

var _ = require('underscore');

var customerRepo = require('../repositories/customer.repository');

exports.getExamDetails = (req, res) => {

        var deffered = Q.defer();

        // console.log('Line 11 customer controller: ', req);

        customerRepo.getExamDetails(req, (success, result) =>{
            if(success)
                deffered.reject({"status": 200, "message": success});
            else
                deffered.resolve({"status": 409, "message": result});
        });

        return deffered.promise;


};

// exports.save = (req, res) => {

//     var deffered = Q.defer();
    
//         examRepo.saveExam(req.body, (error, result) => {

//                     if (error){
//                         console.log(error);
//                         deffered.reject({ "status": 500, data: [], "message": error });
//                     }

//                     else
//                         deffered.resolve({ "status": 200, data: result, "message": "User created  successfully!!" });

//                 });



//     return deffered.promise;
// };
