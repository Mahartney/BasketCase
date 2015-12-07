var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
var itemController = require("./itemController")

var fillBasket = function(){
  var basket = basketController.createBasket();
  var item = itemController.createItem();
  console.log(basket);
  console.log(item)
  // basket.items.push(item.name)
  return basket;
}

module.exports = fillBasket
