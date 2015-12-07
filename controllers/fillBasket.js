var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
var itemController = require("./itemController")

var fillBasket = function(){
  var basket = basketController.createBasket();
  var item = itemController.createItem();
  console.log("this is from the fillbasket file " + basket);
  console.log("similarly this item " + item)
  basket.items.push(item.id)
  return basket;
}

module.exports = fillBasket
