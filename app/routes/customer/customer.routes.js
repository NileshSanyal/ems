var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var customerController = require('../../modules/customer/controllers/customer.controller');

var namedRouter = routeLabel(router);

var passport   = require('passport');

var multer = require('multer');

// const { isAdminAuthenticated } = require('../../../config/auth');

var request_param = multer();

namedRouter.get('customer.register', '/register', function (req, res) {

  res.render('customer/views/customer_register', 
        {
            title: 'Register | EMS'
        });

});

namedRouter.get('customer.login', '/login', function (req, res) {
  let stdLoginErrMessage = req.flash('stdLoginErrMessage')[0];
  let stdLogoutSuccessMessage = req.flash('stdLogoutSuccessMessage')[0];
  res.render('customer/views/customer_login', 
        {
            title: 'Login | EMS',
            stdLoginErrMessage: stdLoginErrMessage,
            stdLogoutSuccessMessage: stdLogoutSuccessMessage
        });

});

namedRouter.post('customer.login', '/login', passport.authenticate('customer-login', {
    
    failureRedirect: '/customer/login',
    failureFlash: true
  }),  
  function (req, res) {
    res.redirect('/customer/dashboard');
  });

  namedRouter.get('customer.logout', '/logout', function(req, res){
    req.logout();
    let stdLoginErrMessage = req.flash('stdLoginErrMessage')[0];
    if (req.session) {
        req.session.destroy(function(err) {
          if(!err) {
            // let user = req.session.passport.user;
            res.redirect('/customer/login');
            /* res.render('customer/views/customer_login', 
            {
                title: 'Login | EMS',
                stdLoginErrMessage: stdLoginErrMessage,
                stdLogoutSuccessMessage: 'Log out successfully!',
                
            }); */
          } 
        });
      }

});  

namedRouter.get('customer.dashboard', '/dashboard', function (req, res) {

  res.render('customer/views/dashboard', 
        {
            title: 'Dashboard | EMS'
        });

});

namedRouter.get('customer.exam_central', '/exam-central', function (req, res) {
  let userData = req.session.user;
  customerController.getExamDetails(userData)
        .then((success) => {
          res.render('customer/views/student_exam_central', 
          {
              title: 'Exam Central | EMS',
              examsList: success.message.allotted_exams
          });

  })
  .catch((error) => {
    // req.flash('adminVerifySuccessMessage', success.message);
    // res.redirect('/admin/login'); 
    console.log('error occurred')
  });
});

namedRouter.get('customer.exam-start', '/exam-start/:examId', function (req, res) {
  // console.log('------------');
  // console.log(req.params.examId);
  let examId = req.params.examId;
  let studentId = req.session.user._id;
  customerController.getQuestionsByExamId(examId)
      .then((success) => {
        res.render('customer/views/exam_page', {
          title: 'Exam Page | EMS',
          studentId: studentId,
          examId: examId,
          questionWithOptions: success.data.questions
        });
    });
});

namedRouter.post('customer.exam-finish', '/customer-exam/finish', function (req, res) {

  // console.log(req.body.qa_details);
  let exam_details = [];
  let finishedExmObj = { exam_details  };

  // finishedExmObj.exam_details.exam_status = 'Started';
  // finishedExmObj.exam_details.exam_start_time = new Date(); 

  finishedExmObj.exam_details.push({
    'exam_status': 'Started',
    'exam_start_time': new Date(),
    'exam_end_time': new Date(),
    'time_spent_by_student': '',
    'exam_id': req.body.exam_id
  });


  finishedExmObj.question_answer_details = req.body.qa_details;
  finishedExmObj.student_id = req.body.student_id;
  // finishedExmObj.exam_id = req.body.exam_id;
  
  // console.log(JSON.stringify(finishedExmObj, undefined, 2));

  customerController.finishExam(finishedExmObj)
    .then((success) => {
      res.render('customer/views/report_page', {
          title: 'Report Page | EMS'
      });
    });

});

namedRouter.get('customer.exam-report', '/customer-exam/report', function (req, res) {
  res.render('customer/views/report_page', {
    title: 'Report Page | EMS'
});
});

module.exports = router;

