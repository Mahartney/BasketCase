var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item= require("../models/item");

function error(response, message){
  response.status(500);
  response.json({error: message})
}

app.get("/", function(req, res){
  Basket.find({}).populate("items").then(function(baskets){
    res.json(baskets);
  });
});

module.export = app
