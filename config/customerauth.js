module.exports = {
    isCustomerAuthenticated: function(req, res, next) {
          if(req.session.stduser != null){
            return next();
          }
          else {
            req.flash('unAuthorizedErrorMessage', 'Please log in to view this page');
            res.redirect('/customer/login');
          }
      
    }
  };
  