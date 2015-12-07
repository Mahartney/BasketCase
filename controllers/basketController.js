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
  },

  createBasket: function(req, res){
    Basket.create({
      //budget: initialize to 0
      //value: initialize to 0
      //created on: default(?)
      //liked: set to false by default
      //items: []
      budget: 0,
      value: 0,
      liked: false,
      items: [],
    }, function(err, docs){
      console.log(err);
      console.log(docs);
      return docs;
    });
  }
}



module.exports = basketController;
