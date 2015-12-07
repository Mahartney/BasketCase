var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");

function error(response, message){
  response.status(500);
  response.json({error: message})
}

var itemController = {
  createItem: function(req, res){
    Item.create({
      name: "nothing",
      price: 0,
      thumbnail: "",
      image: "",
      description: "something for nothing"
    }, function(err, docs){
      console.log(err);
      console.log(docs);
    })
  }
}

module.exports = itemController
