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
    var myBasket = new Basket({
      //budget: initialize to 0
      //value: initialize to 0
      //created on: default(?)
      //liked: set to false by default
      //items: []
      budget: 0,
      value: 0,
      liked: false,
      items: [],
    })

    myBasket.save();
    return myBasket;
  }
}

module.exports = basketController;
