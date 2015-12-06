var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var apac = require('apac');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

app.set('view engine', 'hbs');
mongoose.connect('mongodb://localhost/basketcase')
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', function(req, res){
  res.render('index.hbs');
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
