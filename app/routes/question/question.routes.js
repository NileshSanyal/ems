var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var questionController = require('../../modules/question/controllers/question.controller');

var classController = require('../../modules/class/controllers/class.controller');

var subjectController = require('../../modules/subject/controllers/subject.controller');

var namedRouter = routeLabel(router);

var multer = require('multer');


var request_param = multer();

const { isAdminAuthenticated } = require('../../../config/auth');

namedRouter.get('question.create', '/create', isAdminAuthenticated, function (req, res) {

  const duplicateEmailMessage = req.flash('duplicateEmailMessage')[0];

  classController.getAllClasses(req)
    .then((classData) => {

      subjectController.getAllSubjects(req)
        .then((subjectData) => {
          res.render('question/views/question_create.ejs',
            {
              classList: classData.data,
              subjectList: subjectData.data,
              path: '/question-list',
              duplicateEmailMessage: duplicateEmailMessage
            }
          );

        });

    });

});

namedRouter.get('question.list', '/list', isAdminAuthenticated, function (req, res) {
  let questionCreateSuccessMessage = req.flash('questionCreateSuccessMessage')[0];
  let questionEditSuccessMessage = req.flash('questionEditSuccessMessage')[0];
  let questionDisableSuccessMessage = req.flash('questionDisableSuccessMessage')[0];
  let questionEnableSuccessMessage = req.flash('questionEnableSuccessMessage')[0];
  questionController.getAllquestions(req)
    .then((success) => {

      res.render('question/views/question_list.ejs', { questionList: success.data, path: '/question-list', questionCreateSuccessMessage: questionCreateSuccessMessage, questionEditSuccessMessage: questionEditSuccessMessage, questionDisableSuccessMessage: questionDisableSuccessMessage, questionEnableSuccessMessage: questionEnableSuccessMessage });

    });

});

namedRouter.post('question.save', '/save', function (req, res) {

  questionController.save(req)
    .then((success) => {

      req.flash('questionCreateSuccessMessage', success.message);
      res.redirect('/question/list');
    })
    .catch((error) => {
      req.flash('duplicateEmailMessage', error.message);
      res.redirect('/question/create');
      // console.log(error);

    });

});

namedRouter.get('question.edit', '/edit/:id', isAdminAuthenticated, function (req, res) {
  let questionUpdateErrorMessage = req.flash('questionUpdateErrorMessage')[0];
  classController.getAllClasses(req)
    .then((classList) => {
      questionController.getQuestionById(req)
        .then((success) => {

          subjectController.getAllSubjects(req)
            .then((subjectData) => {

              res.render('question/views/question_edit.ejs',
                {
                  questionDetails: success.data,
                  taughtSubjectsList: success.data.subjects_taught,
                  classList: classList.data,
                  path: '/question-list',
                  subjectList: subjectData.data,
                  questionUpdateErrorMessage: questionUpdateErrorMessage
                });

            })



        })
        .catch((error) => {

          console.log(error);

        });
    });


});

namedRouter.post('question.update', '/update', function (req, res) {
  // console.log(JSON.stringify(req.body, undefined, 2));
  questionController.updatequestion(req)
    .then((success) => {

      req.flash('questionEditSuccessMessage', success.message);
      res.redirect('/question/list');
    })
    .catch((error) => {
      req.flash('questionUpdateErrorMessage', error.message);
      res.redirect(req.get('referer'));
      // console.log(error);

    });

});

namedRouter.get('question.disable', '/disable/:id', isAdminAuthenticated, function (req, res) {

  questionController.disablequestion(req)
    .then((success) => {

      req.flash('questionDisableSuccessMessage', success.message);
      res.redirect('/question/list');
    })
    .catch((error) => {

      console.log(error);

    });


});

namedRouter.get('question.enable', '/enable/:id', isAdminAuthenticated, function (req, res) {

  questionController.enablequestion(req)
    .then((success) => {

      req.flash('questionEnableSuccessMessage', success.message);
      res.redirect('/question/list');
    })
    .catch((error) => {

      console.log(error);

    });


});


module.exports = router;

