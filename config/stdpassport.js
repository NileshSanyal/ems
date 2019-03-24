var LocalStrategy = require('passport-local').Strategy;

const { User } = require('../app/modules/user/models/user.model');

module.exports = (passport) => {

    // local strategy for student login
    passport.use(
        'customer-login',
        new LocalStrategy({ usernameField: 'email', passwordField: 'contact_no', passReqToCallback: true }, function(req, email, contact_no, done) {
          
              User.findOne({
                email: email,
                contact_no: contact_no
              }).exec((err, user) => {
                if(err) {
                  console.log('500 internal server error');
                  return done(null, false, req.flash('stdLoginErrMessage', 'Something went wrong. Try again.'));
                }
                if(!user) {
                  console.log('no student found');
                  return done(null, false, req.flash('stdLoginErrMessage', 'No user found.'));  
                }
                else{
                         
                    req.session.user = user;
                    return done(null, user);
                }   
                    
              });
        })
      );

      passport.serializeUser(function (user, done) {
        done(null , user);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

};