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
                    
                   /*
                        {
                            "user_type": "Student",
                            "subjects_taught": [],
                            "allotted_exams": [
                                "5c710faa515812292423cf29",
                                "5c7172cad349cd185c687f15"
                            ],
                            "isDeleted": false,
                            "_id": "5c8a71a2107905205c530014",
                            "full_name": "Jhon Doe",
                            "email": "jhon@gmail.com",
                            "contact_no": "8844556699",
                            "class_attended": "5c70c57ac6eebb0e80ed3257",
                            "created_at": "2019-03-14T15:22:10.488Z",
                            "updated_at": "2019-03-14T15:22:10.489Z",
                            "__v": 0
                        }

                   */     


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