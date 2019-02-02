var express = require('express');
var routeLabel = require('route-label');

var router = express.Router();

var adminController = require('../../modules/admin/controllers/admin.controller');

var namedRouter = routeLabel(router);

var passport   = require('passport');

var multer = require('multer');

var request_param = multer();

const { isAdminAuthenticated } = require('../../../config/auth');

namedRouter.get('admin.dashboard', '/dashboard', isAdminAuthenticated, function (req, res) {

  res.render('admin/views/index', { path: '/dashboard' });

});


namedRouter.get('admin.register', '/register', function( req, res) {
    
    let adminSaveErrorMessage = req.flash('adminSaveErrorMessage')[0];

    if(req.user != undefined){
        res.redirect('/admin/dashboard');
    }

    else{
        res.render('admin/views/register', 
        {
            title: 'Sign Up', 
            adminSaveErrorMessage: adminSaveErrorMessage
        });
    }  
});

namedRouter.get('admin.login', '/login', function( req, res) {
    let adminCreateSuccessMessage = req.flash('adminCreateSuccessMessage')[0];
    let logoutSuccessMessage = req.flash('logoutSuccessMessage')[0];
    let unAuthorizedErrorMessage = req.flash('unAuthorizedErrorMessage')[0];
    let adminVerifyErrorMessage = req.flash('adminVerifyErrorMessage')[0];
    let adminVerifySuccessMessage = req.flash('adminVerifySuccessMessage')[0];


    if(req.user != undefined){
        res.redirect('/admin/dashboard');
    }
    else{
        res.render('admin/views/login', 
        {
            title: 'Sign In',
            adminCreateSuccessMessage: adminCreateSuccessMessage,
            logoutSuccessMessage: logoutSuccessMessage,
            unAuthorizedErrorMessage: unAuthorizedErrorMessage,
            adminVerifyErrorMessage: adminVerifyErrorMessage,
            adminVerifySuccessMessage: adminVerifySuccessMessage
        });
    }
    
});

namedRouter.post('admin.register', '/register', function( req, res){

    adminController.saveadmin(req)
    .then((success) => {
      req.flash('adminCreateSuccessMessage', success.message);
      res.redirect('/admin/login');
    })
    .catch((error) => {
      req.flash('adminSaveErrorMessage', error.message);
      res.redirect('/admin/register'); 

    });

});

namedRouter.post('admin.login', '/login', passport.authenticate('local-login', {
        // successRedirect : '/admin/dashboard', 
        failureRedirect: '/admin/login',
        failureFlash: true
    }),
    function (req, res) {

        res.redirect('/admin/dashboard');

    });

    namedRouter.get('admin.logout', '/logout', function(req, res){
        req.logout();

        if (req.session) {
            req.session.destroy(function(err) {
              if(!err) {
                res.render('admin/views/login', 
                {
                    title: 'Sign In',
                    adminCreateSuccessMessage: '',
                    logoutSuccessMessage: 'You are logged out',
                    unAuthorizedErrorMessage: '',
                    adminVerifySuccessMessage: '',
                    adminVerifyErrorMessage: ''
                });
              } 
            });
          }

    });

    namedRouter.get('admin.verify', '/verify/:token', function(req, res){

        adminController.verifyadmin(req)
        .then((error) => {
            req.flash('adminVerifyErrorMessage', error.message);
            res.redirect('/admin/login');
        })
        .catch((success) => {
            req.flash('adminVerifySuccessMessage', success.message);
            res.redirect('/admin/login'); 

        });


    });


module.exports = router;

