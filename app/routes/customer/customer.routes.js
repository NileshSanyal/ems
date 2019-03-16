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

  res.render('customer/views/customer_login', 
        {
            title: 'Login | EMS'
        });

});

/* namedRouter.post('customer.login', '/login', function(req, res) {
  console.log(req.body);
}); */

namedRouter.post('customer.login', '/login', passport.authenticate('customer-login', {
    
    failureRedirect: '/customer/login',
    failureFlash: true
  }),  
  function (req, res) {
    // console.log(req.body);
    res.redirect('/customer/dashboard');
  });

//   namedRouter.get('customer.logout', '/logout', function(req, res){
//     req.logout();

//     if (req.session) {
//         req.session.destroy(function(err) {
//           if(!err) {
//             res.render('customer/views/customer_login', 
//             {
//                 title: 'Login | EMS'
//                 /* adminCreateSuccessMessage: '',
//                 logoutSuccessMessage: 'You are logged out',
//                 unAuthorizedErrorMessage: '',
//                 adminVerifySuccessMessage: '',
//                 adminVerifyErrorMessage: '' */
//             });
//           } 
//         });
//       }

// });  

namedRouter.get('customer.dashboard', '/dashboard', function (req, res) {

  res.render('customer/views/dashboard', 
        {
            title: 'Dashboard | EMS'
        });

});

namedRouter.get('customer.exam_central', '/exam-central', function (req, res) {
  res.render('customer/views/student_exam_central', 
  {
      title: 'Exam Central | EMS'
  });
});

module.exports = router;

