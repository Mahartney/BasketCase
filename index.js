var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var apac = require('apac');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Basket = require("./models/basket");
var Song = require("./models/item");


app.set('view engine', 'hbs');
mongoose.connect('mongodb://localhost/basketcase')
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/:format?", function(req, res, next){
  console.log(req.params)
  if (req.params.format == 'json') {
    Basket.find({}).populate("items").then(function(baskets){
  });
    res.render('index.hbs');
  } else {
    res.render('index.hbs');
  }

});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
