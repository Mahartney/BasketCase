var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");

function error(response, message){
  response.status(500);
  response.json({error: message})
}

var basketController = {
  getBaskets: function(req, res){
  Basket.find({}).then(function(baskets){
    res.json(baskets);
  });
  }
}



module.exports = basketController;
