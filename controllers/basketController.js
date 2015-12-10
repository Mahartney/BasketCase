var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var itemController = require("./itemController")
var shopFor = require("./helpers/shopFor.js")

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
    // calls the required shopFor in helpers
    var rnd_budgets = shopFor(req.body.budget)

    // creates the basket in db
    var basket_id;
    Basket.create(req.body).then(function(basket){
      basket_id = basket.id;
      basket.update({
        rnd_budgets: rnd_budgets
      }).then(function(basket){

        // sends basket as parameter to function
        Basket.findById(basket_id, function(err, doc){
          var basket = doc;
          res.redirect('/baskets/'+basket.id)
        });
      });
    });
  },

  updateItems: function(basket, newItems){
    basket_id = basket.id;
    Basket.findById(basket_id).update({
      items: newItems
    });
    return basket;
  }

}

module.exports = basketController;
