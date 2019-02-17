var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

// var userController = require('../../modules/exam/controllers/user.controller');

var resultController = require('../../modules/result/controllers/result.controller');

var examController = require('../../modules/exam/controllers/exam.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');


var request_param = multer();

const { isAdminAuthenticated } = require('../../../config/auth');

namedRouter.get('result.create', '/create', isAdminAuthenticated, function (req, res) {

  const duplicateEmailMessage = req.flash('duplicateEmailMessage')[0];

  // classController.getAllClasses(req)
    // .then((classData) => {

      subjectController.getAllSubjects(req)
        .then((subjectData) => {
          console.log(JSON.stringify(subjectData,undefined,2));
          res.render('result/views/result_create.ejs',
            {
              // classList: classData.data,
              subjectList: subjectData.data,
              path: '/result-list',
              duplicateEmailMessage: duplicateEmailMessage
            }
          );

        });

    // });

});

namedRouter.get('result.list', '/list', isAdminAuthenticated, function (req, res) {
  let examCreateSuccessMessage = req.flash('resultCreateSuccessMessage')[0];
  let examEditSuccessMessage = req.flash('resultEditSuccessMessage')[0];
  let examDisableSuccessMessage = req.flash('examDisableSuccessMessage')[0];
  let examEnableSuccessMessage = req.flash('examEnableSuccessMessage')[0];
  examController.getAllExam(req)
    .then((success) => {

      res.render('exam/views/exam_list.ejs', { examList: success.data, path: '/exam-list', examCreateSuccessMessage: examCreateSuccessMessage, examEditSuccessMessage: examEditSuccessMessage, examDisableSuccessMessage: examDisableSuccessMessage, examEnableSuccessMessage: examEnableSuccessMessage });

    });

});

namedRouter.post('result.save', '/save', function (req, res) {

  examController.save(req)
    .then((success) => {

      req.flash('examCreateSuccessMessage', success.message);
      res.redirect('/exam/list');
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

