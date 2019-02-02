// const bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

const { Adminuser } = require('../app/modules/admin/models/admin.model');

module.exports = (passport) => {
    
      passport.use(
        'local-login',
        new LocalStrategy({ usernameField: 'email',passwordField: 'password', passReqToCallback : true }, function(req, email, password, done){

          process.nextTick(function () {

            // ?
            if(email == 'undefined' || password == 'undefined'){
              return done(null, false, req.flash('loginErrMessage', 'Email/Password can not be left empty!'));
            }

            Adminuser.findOne({
              email: email
            }).exec((err, user) => {
              if (err)
                return done(null, false, req.flash('loginErrMessage', 'Something went wrong. Try again.'));
              if (!user) {
                return done(null, false, req.flash('loginErrMessage', 'No user found.'));
              }
              
              if (!user.validPassword(password)){ 
                  return done(null, false, req.flash('loginErrMessage', 'Oops! Wrong password.'));
                  
              }

              else{

                // ?
                if(user.verify_code == ""){
                  return done(null, false, req.flash('loginErrMessage', 'Please verify your email to login.'));
                }
                else{
                  return done(null, user);
                }
                  
              }
            });

        });

        })
      );

    passport.serializeUser(function (user, done) {
        done(null , user);
    });
    
    passport.deserializeUser(function(id, done) {
      Adminuser.findById(id, function(err, user) {
          done(err, user);
        });
      });
    
};