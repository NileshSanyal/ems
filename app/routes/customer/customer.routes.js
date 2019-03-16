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
    // console.log(req.body);
    res.redirect('/customer/dashboard');
  });

  namedRouter.get('customer.logout', '/logout', function(req, res){
    req.logout();
    let stdLoginErrMessage = req.flash('stdLoginErrMessage')[0];
    if (req.session) {
        req.session.destroy(function(err) {
          if(!err) {
            res.render('customer/views/customer_login', 
            {
                title: 'Login | EMS',
                stdLoginErrMessage: stdLoginErrMessage,
                stdLogoutSuccessMessage: 'Log out successfully!',
                /* adminCreateSuccessMessage: '',
                logoutSuccessMessage: 'You are logged out',
                unAuthorizedErrorMessage: '',
                adminVerifySuccessMessage: '',
                adminVerifyErrorMessage: '' */
            });
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
  console.log(req.user);
  res.render('customer/views/student_exam_central', 
  {
      title: 'Exam Central | EMS'
  });
});

module.exports = router;

