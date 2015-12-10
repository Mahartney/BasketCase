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

// baskets routing
app.get('/baskets', basketController.getBaskets);
app.post('/baskets', basketController.createBasket);

app.get('/baskets/:id', itemController.amazonCall)

app.get("/:format?", function(req, res, next){
  if (req.params.format == '.json') {
    Item.find({}).then(function(items){
      res.json(items);
    })
  } else {
    res.render('index.hbs');
  }
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
