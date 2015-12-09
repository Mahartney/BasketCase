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

    var shopFor =[]
    var budget = req.body.budget;
    var numItems = Math.floor(Math.random()*5)+1; //determines number of items to shop for
    var numItemsArr = []
    for (var i = 0; i < numItems; i++) {
        var itemAmt = Math.floor(Math.random()*100)+1
        numItemsArr.push(itemAmt)
    }
    var numItemsSum = numItemsArr.reduce((a,b) => a+b)

    for (var i = 0; i < numItemsArr.length; i++) {
      shopFor.push(Math.floor(numItemsArr[i]/numItemsSum*budget))
    }
    var basket_id;
    Basket.create(req.body).then(function(basket){
      basket_id = basket.id;
      basket.update({
        rnd_budgets: shopFor
      }).then(function(basket){
        res.json(basket);
        Basket.findById(basket_id, function(err, doc){
          var basket = doc;

        })


      })
    })
  }
}



module.exports = basketController;
