var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var Basket = require("./models/basket");
var Item = require("./models/item");

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var methodOverride = require('method-override')

var usersController = require('./controllers/usersController')
var basketController = require('./controllers/basketController')
var itemController = require('./controllers/itemController')
app.set('view engine', 'hbs');

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
});

function authenticatedUser(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

// users routing
app.get('/signup', usersController.getSignup);
app.post('/signup', usersController.postSignup);
app.get('/login', usersController.getLogin);
app.post('/login', usersController.postLogin);
app.get('/logout', usersController.getLogout);
app.get('/secret', usersController.getSecret);

// twitter auth
// app.get('/auth/twitter', usersController.twitterLogin);
 
// baskets routing
app.get('/baskets', basketController.getBaskets);
app.post('/baskets', basketController.createBasket);

app.get('/baskets/:id', itemController.amazonCall)

app.get('/', function(req, res){
  res.render('index.hbs');
})

app.get("/mostRecent", function(req, res){
    Basket.find({items:{$exists: true, $ne:[]}},{},{ sort: { 'created_on' : -1 } }).limit(8).then(function(baskets){
      res.json(baskets);
    })
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
