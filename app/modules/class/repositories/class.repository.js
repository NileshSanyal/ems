
// var Class = require('../models/class.model');

const { Class, validateClass } = require('../models/class.model');


var classRepository = {

    saveClass: (classObj, cb) => {

        const { error } = validateClass(classObj);

        let errorDetails;

        if (error) {
            errorDetails = error.message;
            return cb(errorDetails, null);
        }
        else {
            let class1 = new Class({
                description: classObj.class_description,
                class_name: classObj.class_name
            });

            class1.save((err, classObj) => {
                if (err)
                    return cb(err, null);
                else
                    return cb(null, classObj);
            });
        }

    },

    getAllClasses: (authors, cb) => {
        Class.find({}, (err, results) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, results);
        });
    },

    getClassById: (classId, cb) => {
        Class.findById(classId, (err, classData) => {
            if (err)
                return cb(err, null);
            else
                return cb(null, classData);
        });
    },

    updateClass: (classObj, cb) => {
        const { error } = validateClass(classObj);
        let errorDetails;

        if (error) {
            
            errorDetails = error.message;
            return cb(errorDetails, null);
        }

        else {
            
            Class.findByIdAndUpdate(classObj.classIdVal, { class_name: classObj.class_name, description: classObj.class_description }, (err, result) => {

                if (err)
                    return cb(err, null);
                else
                    return cb(null, result);

            });
        }


    },

    enableClass: (classData, cb) => {
        Class.findByIdAndUpdate(classData.params.id, { isDeleted: false }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });
    },

    disableClass: (classData, cb) => {

        Class.findByIdAndUpdate(classData.params.id, { isDeleted: true }, { new: true, upsert: true }, (err, result) => {

            if (err)
                return cb(err, null);
            else
                return cb(null, result);

        });

    }
};
module.exports = classRepository;