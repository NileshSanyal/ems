module.exports = {
    isAdminAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('unAuthorizedErrorMessage', 'Please log in to view this page');
      res.redirect('/admin/login');
    }
  };
  