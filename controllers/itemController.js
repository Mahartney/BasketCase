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
    var item = new Item({
      name: "nothing",
      price: 0,
      thumbnail: "",
      image: "",
      description: "something for nothing"
    });
    item.save();
    return item;
  }
}

module.exports = itemController
