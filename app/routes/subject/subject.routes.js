var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var subjectController = require('../../modules/subject/controllers/subject.controller');

var classController = require('../../modules/class/controllers/class.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');

const { isAdminAuthenticated } = require('../../../config/auth');

var request_param = multer();

namedRouter.get('subject.create', '/create', isAdminAuthenticated, function (req, res) {

  // let subjectCreateErrorMessage = req.flash('subjectCreateErrorMessage')[0];
  let subjectCreateErrorMessage = req.flash('subjectCreateErrorMessage');

  classController.getAllClasses(req)
    .then((classData) => {
      res.render('subject/views/subject_create', { classList: classData.data, path: '/subject-list', subjectCreateErrorMessage: subjectCreateErrorMessage });


    });

});

namedRouter.get('subject.list', '/list', isAdminAuthenticated, function (req, res) {
  let subjectCreateSuccessMessage = req.flash('subjectCreateSuccessMessage')[0];
  let subjectEditSuccessMessage = req.flash('subjectEditSuccessMessage')[0];
  let subjectDisableSuccessMessage = req.flash('subjectDisableSuccessMessage')[0];
  let subjectEnableSuccessMessage = req.flash('subjectEnableSuccessMessage')[0];
  subjectController.getAllSubjects(req)
    .then((success) => {
      res.render('subject/views/subject_list', { subjectList: success.data, path: '/subject-list', subjectCreateSuccessMessage: subjectCreateSuccessMessage,subjectEditSuccessMessage: subjectEditSuccessMessage,subjectDisableSuccessMessage: subjectDisableSuccessMessage,subjectEnableSuccessMessage: subjectEnableSuccessMessage });

    });

});

namedRouter.post('subject.save', '/save', function (req, res) {

  subjectController.save(req)
    .then((success) => {

      req.flash('subjectCreateSuccessMessage', success.message);
      res.redirect('/subject/list');
    })
    .catch((error) => {
      
      req.flash('subjectCreateErrorMessage', error.message);
      res.redirect('/subject/create');
      console.log(error);
      
    });

});

namedRouter.get('subject.edit', '/edit/:id', isAdminAuthenticated, function (req, res) {
  // const subjectUpdateErrorMessage = req.flash('subjectUpdateErrorMessage')[0];
  const subjectUpdateErrorMessage = req.flash('subjectUpdateErrorMessage');
  classController.getAllClasses(req)
    .then((classData) => {

      subjectController.getSubjectById(req)
        .then((subjectData) => {

          res.render('subject/views/subject_edit', { subjectDetails: subjectData.data, classList: classData.data , path: '/subject-list', subjectUpdateErrorMessage: subjectUpdateErrorMessage });

        });

    })
    .catch((error) => {

      console.log(error);
      
    });
  


});

namedRouter.post('subject.update', '/update', function (req, res) {

  subjectController.updateSubject(req)
    .then((success) => {

      req.flash('subjectEditSuccessMessage', success.message);
      res.redirect('/subject/list');
    })
    .catch((error) => {
      req.flash('subjectUpdateErrorMessage', error.message);
      res.redirect(req.get('referer'));
      // console.log(error);
      
    });

});

namedRouter.get('subject.disable', '/disable/:id', function (req, res) {

  subjectController.disableSubject(req)
    .then((success) => {

      req.flash('subjectDisableSuccessMessage', success.message);
      res.redirect('/subject/list');
    })
    .catch((error) => {

      console.log(error);
      
    });


});

namedRouter.get('subject.enable', '/enable/:id', function (req, res) {

  subjectController.enableSubject(req)
    .then((success) => {

      req.flash('subjectEnableSuccessMessage', success.message);
      res.redirect('/subject/list');
    })
    .catch((error) => {

      console.log(error);
      
    });


});




module.exports = router;

