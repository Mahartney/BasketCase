var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var apac = require('apac');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var methodOverride = require('method-override')
var usersController = require('./controllers/usersController')
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/basketcase');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(session({secret: 'Basket Case'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

app.use(function(req, res, next){
  res.locals.currentUser = req.user
  next();
})

app.get('/', function(req, res){
  res.render('index');
});

function authenticatedUser(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

app.get('/signup', usersController.getSignup);
app.post('/signup', usersController.postSignup);
app.get('/login', usersController.getLogin);
app.post('/login', usersController.postLogin);
app.get('/logout', usersController.getLogout);
app.get('/secret', usersController.getSecret);

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
