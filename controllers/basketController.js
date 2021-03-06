var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var itemController = require("./itemController")
var shopFor = require("./helpers/shopFor.js")
var passport = require("passport")

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
    if (req.user){
      var user = req.user.local.email
    }else {
      var user = "anon"
    }
    // creates the basket in db
    var basket_id;
    Basket.create(req.body).then(function(basket){
      basket_id = basket.id;
      basket.update({
        owner: user,
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
  },

  getMyBaskets: function(req, res){
    Basket.find({owner: req.user.local.email}).then(function(baskets){
      // res.render('secret', {baskets: baskets});
      res.json(baskets)
    });
  }

}

module.exports = basketController;
