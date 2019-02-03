var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var classController = require('../../modules/class/controllers/class.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');

const { isAdminAuthenticated } = require('../../../config/auth');

var request_param = multer();

// namedRouter.get('admin.dashboard', '/dashboard', function (req, res) {

//   res.render('class/views/index.ejs', { path: '/dashboard' });

// });


namedRouter.get('class.create', '/create', isAdminAuthenticated, function (req, res) {
  // let classSaveErrorMessage = req.flash('classSaveErrorMessage')[0];
  let classSaveErrorMessage = req.flash('classSaveErrorMessage');
  res.render('class/views/class_create',
    {
      path: '/class-list',
      classSaveErrorMessage: classSaveErrorMessage
    }
  );

});

namedRouter.get('class.list', '/list', isAdminAuthenticated, function (req, res) {
  let classCreateSuccessMessage = req.flash('classCreateSuccessMessage')[0];
  let classEditSuccessMessage = req.flash('classEditSuccessMessage')[0];
  let classDisableSuccessMessage = req.flash('classDisableSuccessMessage')[0];
  let classEnableSuccessMessage = req.flash('classEnableSuccessMessage')[0];
  classController.getAllClasses(req)
    .then((success) => {

      res.render('class/views/class_list', { classList: success.data, path: '/class-list', classCreateSuccessMessage: classCreateSuccessMessage, classEditSuccessMessage: classEditSuccessMessage, classDisableSuccessMessage: classDisableSuccessMessage, classEnableSuccessMessage: classEnableSuccessMessage });

    });

});

namedRouter.post('class.save', '/save', function (req, res, next) {
  classController.save(req)
    .then((success) => {
      req.flash('classCreateSuccessMessage', success.message);
      res.redirect('/class/list');
    })
    .catch((error) => {
      req.flash('classSaveErrorMessage', error.message);
      res.redirect('/class/create');
    });

});

namedRouter.get('class.edit', '/edit/:id', isAdminAuthenticated, function (req, res) {

  // let classUpdateErrorMessage = req.flash('classUpdateErrorMessage')[0];

  let classUpdateErrorMessage = req.flash('classUpdateErrorMessage');

  classController.getClassById(req)
    .then((success) => {

      res.render('class/views/class_edit', { classDetails: success.data, path: '/class-list', classUpdateErrorMessage: classUpdateErrorMessage });

    });

});

namedRouter.post('class.update', '/update', function (req, res) {

  classController.updateClass(req)
    .then((success) => {
      req.flash('classEditSuccessMessage', success.message);
      res.redirect('/class/list');
    })
    .catch((error) => {
      req.flash('classUpdateErrorMessage', error.message);
      res.redirect(req.get('referer'));
      // res.redirect('/class/create');
      // console.log(error);

    });

});

namedRouter.get('class.disable', '/disable/:id', function (req, res) {

  classController.disableClass(req)
    .then((success) => {
      req.flash('classDisableSuccessMessage', success.message);
      res.redirect('/class/list');
    });


});

namedRouter.get('class.enable', '/enable/:id', function (req, res) {

  classController.enableClass(req)
    .then((success) => {
      req.flash('classEnableSuccessMessage', success.message);
      res.redirect('/class/list');
    });

});


module.exports = router;

