var passport = require("passport")

// GET /signup
var usersController = {
  getSignup: function(req, res){
    res.render('signup', {message: req.flash('signupMessage')
    });
  },

  postSignup: function(req, res){
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    });
    return signupStrategy(req, res);
  },

  getLogin: function(req, res){
    res.render('login.hbs', {message: req.flash('loginMessage')})
  },

  postLogin: function(req, res){
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    });
    return loginStrategy(req, res);
  },

  getLogout: function(req, res){
    req.logout();
    res.redirect('/');
  },

  getSecret: function(req, res){
    res.render('secret.hbs')
  },

  twitterLogin: function(req, res){
    var authenticate = passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
    return authenticate;
  }
}


module.exports = usersController;
