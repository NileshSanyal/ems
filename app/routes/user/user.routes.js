var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var userController = require('../../modules/user/controllers/user.controller');

var classController = require('../../modules/class/controllers/class.controller');

var subjectController = require('../../modules/subject/controllers/subject.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');

const { isAdminAuthenticated } = require('../../../config/auth');

var request_param = multer();

namedRouter.get('user.create', '/create', isAdminAuthenticated, function (req, res) {

  // const duplicateEmailMessage = req.flash('duplicateEmailMessage')[0];
  const duplicateEmailMessage = req.flash('duplicateEmailMessage');

  classController.getAllClasses(req)
    .then((classData) => {

      subjectController.getAllSubjects(req)
        .then((subjectData) => {
          res.render('user/views/user_create',
            {
              classList: classData.data,
              subjectList: subjectData.data,
              path: '/user-list',
              duplicateEmailMessage: duplicateEmailMessage
            }
          );

        });

    });

});

namedRouter.get('user.list', '/list', isAdminAuthenticated, function (req, res) {
  let userCreateSuccessMessage = req.flash('userCreateSuccessMessage')[0];
  let userEditSuccessMessage = req.flash('userEditSuccessMessage')[0];
  let userDisableSuccessMessage = req.flash('userDisableSuccessMessage')[0];
  let userEnableSuccessMessage = req.flash('userEnableSuccessMessage')[0];
  userController.getAllUsers(req)
    .then((success) => {

      res.render('user/views/user_list', { userList: success.data, path: '/user-list', userCreateSuccessMessage: userCreateSuccessMessage, userEditSuccessMessage: userEditSuccessMessage, userDisableSuccessMessage: userDisableSuccessMessage, userEnableSuccessMessage: userEnableSuccessMessage });

    });

});

namedRouter.post('user.save', '/save', function (req, res) {

  userController.save(req)
    .then((success) => {

      req.flash('userCreateSuccessMessage', success.message);
      res.redirect('/user/list');
    })
    .catch((error) => {
      req.flash('duplicateEmailMessage', error.message);
      res.redirect('/user/create');
      // console.log(error);

    });

});

namedRouter.get('user.edit', '/edit/:id', isAdminAuthenticated, function (req, res) {
  let userUpdateErrorMessage = req.flash('userUpdateErrorMessage')[0];
  classController.getAllClasses(req)
    .then((classList) => {
      userController.getUserById(req)
        .then((success) => {

          subjectController.getAllSubjects(req)
            .then((subjectData) => {

              res.render('user/views/user_edit',
                {
                  userDetails: success.data,
                  taughtSubjectsList: success.data.subjects_taught,
                  classList: classList.data,
                  path: '/user-list',
                  subjectList: subjectData.data,
                  userUpdateErrorMessage: userUpdateErrorMessage
                });

            })



        })
        .catch((error) => {

          console.log(error);

        });
    });


});

namedRouter.post('user.update', '/update', function (req, res) {
  // console.log(JSON.stringify(req.body, undefined, 2));
  userController.updateUser(req)
    .then((success) => {

      req.flash('userEditSuccessMessage', success.message);
      res.redirect('/user/list');
    })
    .catch((error) => {
      req.flash('userUpdateErrorMessage', error.message);
      res.redirect(req.get('referer'));
      // console.log(error);

    });

});

namedRouter.get('user.disable', '/disable/:id', function (req, res) {

  userController.disableUser(req)
    .then((success) => {

      req.flash('userDisableSuccessMessage', success.message);
      res.redirect('/user/list');
    })
    .catch((error) => {

      console.log(error);

    });


});

namedRouter.get('user.enable', '/enable/:id', function (req, res) {

  userController.enableUser(req)
    .then((success) => {

      req.flash('userEnableSuccessMessage', success.message);
      res.redirect('/user/list');
    })
    .catch((error) => {

      console.log(error);

    });


});


module.exports = router;

