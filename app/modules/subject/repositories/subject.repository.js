
// var Subject = require('../models/subject.model');
const { Subject, validateSubject } = require('../models/subject.model');
var mongoose = require('mongoose');
var subjectRepository = {

    saveSubject: (subjectObj, cb) => {

        const { error } = validateSubject(subjectObj);

        let errorDetails;

        if (error) {

            //
            let errorArrayLength = error.details.length;
            let errorsArray = [];

            if(errorArrayLength > 1){
                for(var i = 0; i< errorArrayLength; i++){
                    errorsArray.push({"errorMessage": error.details[i].message});
                }
            }
        
            else{

                errorsArray.push({"errorMessage": error.details[0].message});
            }
            //
            return cb(errorsArray, null);
            // errorDetails = error.message;
            // return cb(errorDetails, null);
        }
        else {
            let classId = mongoose.Types.ObjectId(subjectObj.class);
            let subject = new Subject({
                subject_name: subjectObj.subject_name,
                class: classId
            });

            subject.save((err, subjectObj) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, subjectObj);
            });
        }
    },

    getAllSubjects: (subjects, cb) => {
        Subject.find({}, (err, results) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, results);
        });
    },

    getSubjectById: (subjectId, cb) => {

        Subject.findById(subjectId)
            .populate('class')
            .exec((err, subjectData) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, subjectData);
            });
    },

    updateSubject: (subjectObj, cb) => {

        const { error } = validateSubject(subjectObj);

        // let errorDetails;

        if (error) {

            let errorArrayLength = error.details.length;
            let errorsArray = [];

            if(errorArrayLength > 1){
                for(var i = 0; i< errorArrayLength; i++){
                    errorsArray.push({"errorMessage": error.details[i].message});
                }
            }
        
            else{

                errorsArray.push({"errorMessage": error.details[0].message});
            }

            // errorDetails = error.message;
            return cb(errorsArray, null);
        }
        else {
            Subject.findByIdAndUpdate(subjectObj.subjectIdVal, { subject_name: subjectObj.subject_name, class: subjectObj.class }, (err, result) => {

                if (err)
                    return cb(err, null);
                else
                    return cb(null, result);

            });
        }

    },

    enableSubject: (subjectData, cb) => {
        Subject.findByIdAndUpdate(subjectData.params.id, { isDeleted: false }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });
    },

    disableSubject: (subjectData, cb) => {

        //
        Subject.findByIdAndUpdate(subjectData.params.id, { isDeleted: true }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });

    }

};
module.exports = subjectRepository;