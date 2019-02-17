var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

// var userController = require('../../modules/exam/controllers/user.controller');

var questionController = require('../../modules/question/controllers/question.controller');

var examController = require('../../modules/exam/controllers/exam.controller');

var classController = require('../../modules/class/controllers/class.controller');

var subjectController = require('../../modules/subject/controllers/subject.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');

const { isAdminAuthenticated } = require('../../../config/auth');

var request_param = multer();

namedRouter.get('exam.create', '/create', isAdminAuthenticated, function (req, res) {

  const duplicateEmailMessage = req.flash('duplicateEmailMessage')[0];

  classController.getAllClasses(req)
    .then((classData) => {
          res.render('exam/views/exam_create.ejs',
            {
              classList: classData.data,
              // subjectList: subjectData.data,
              path: '/exam-list',
              duplicateEmailMessage: duplicateEmailMessage
            }
          );


    });

});

namedRouter.get('exam.list', '/list', isAdminAuthenticated, function (req, res) {
  let examCreateSuccessMessage = req.flash('examCreateSuccessMessage')[0];
  let examEditSuccessMessage = req.flash('examEditSuccessMessage')[0];
  let examDisableSuccessMessage = req.flash('examDisableSuccessMessage')[0];
  let examEnableSuccessMessage = req.flash('examEnableSuccessMessage')[0];
  examController.getAllExam(req)
    .then((success) => {

      res.render('exam/views/exam_list.ejs', { examList: success.data, path: '/exam-list', examCreateSuccessMessage: examCreateSuccessMessage, examEditSuccessMessage: examEditSuccessMessage, examDisableSuccessMessage: examDisableSuccessMessage, examEnableSuccessMessage: examEnableSuccessMessage });

    });

});

namedRouter.post('exam.save', '/save', function (req, res) {
  console.log(JSON.stringify(req.body, undefined, 2));
  examController.save(req)
    .then((success) => {

      res.json({success: 1});

      // req.flash('examCreateSuccessMessage', success.message);
      // res.redirect('/exam/list');

    });

});

namedRouter.get('exam.findSubjectByClass', '/findSubjectByClass', isAdminAuthenticated, function (req, res) { 
  console.log(JSON.stringify(req.query, undefined, 2));

  examController.findSubjectByClass(req)
    .then((success) => {

      res.json({success: 1, data: success.data});

      // req.flash('examCreateSuccessMessage', success.message);
      // res.redirect('/exam/list');

    }).catch((error) =>{
      res.json({error: 1});
    });


});

namedRouter.get('exam.findQuestionByClassAndSubject', '/findQuestionByClassAndSubject', isAdminAuthenticated, function (req, res) {

  examController.findQuestionByClassAndSubject(req)
    .then((success) => {
      /*
             [ { isDeleted: false,
       _id: 5c4d6f20c74f2ec5d0ce1d9a,
       question: 'What is C++ language?',
       answer1: 'Programming language',
       answer2: 'Spoken language',
       answer3: 'Unknown language',
       answer4: 'Assmbly level language',
       subject_id: 5c1a5edefa811426f0424f9e,
       class_id: 5c19dc53fdef1307e43e1383,
       created_at: 2019-01-27T13:58:17.368Z,
       updated_at: 2019-01-27T13:58:17.368Z } ] }

      */

      res.json({success: 1, data: success.data});

    }).catch((error) =>{
      res.json({error: 1});
    });

});

// namedRouter.get('user.edit', '/edit/:id', function (req, res) {
//   let userUpdateErrorMessage = req.flash('userUpdateErrorMessage')[0];
//   classController.getAllClasses(req)
//     .then((classList) => {
//       userController.getUserById(req)
//         .then((success) => {

//           subjectController.getAllSubjects(req)
//             .then((subjectData) => {

//               res.render('user/views/user_edit.ejs',
//                 {
//                   userDetails: success.data,
//                   taughtSubjectsList: success.data.subjects_taught,
//                   classList: classList.data,
//                   path: '/user-list',
//                   subjectList: subjectData.data,
//                   userUpdateErrorMessage: userUpdateErrorMessage
//                 });

//             })



//         })
//         .catch((error) => {

//           console.log(error);

//         });
//     });


// });

// namedRouter.post('user.update', '/update', function (req, res) {
//   // console.log(JSON.stringify(req.body, undefined, 2));
//   userController.updateUser(req)
//     .then((success) => {

//       req.flash('userEditSuccessMessage', success.message);
//       res.redirect('/user/list');
//     })
//     .catch((error) => {
//       req.flash('userUpdateErrorMessage', error.message);
//       res.redirect(req.get('referer'));
//       // console.log(error);

//     });

// });

// namedRouter.get('user.disable', '/disable/:id', function (req, res) {

//   userController.disableUser(req)
//     .then((success) => {

//       req.flash('userDisableSuccessMessage', success.message);
//       res.redirect('/user/list');
//     })
//     .catch((error) => {

//       console.log(error);

//     });


// });

// namedRouter.get('user.enable', '/enable/:id', function (req, res) {

//   userController.enableUser(req)
//     .then((success) => {

//       req.flash('userEnableSuccessMessage', success.message);
//       res.redirect('/user/list');
//     })
//     .catch((error) => {

//       console.log(error);

//     });


// });


module.exports = router;

