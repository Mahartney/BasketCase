var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
var env = require("../env.js")

var util = require('util');
OperationHelper = require('../node_modules/apac').OperationHelper;

var randomWord = require("../keyword.js")


var opHelper = new OperationHelper(env);

var APICall = function(newBasket, maxPrice){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': randomWord(),
    'MaximumPrice': maxPrice,
    'MinimumPrice': maxPrice - 100,
    'ResponseGroup': 'ItemAttributes,Images,Offers,OfferFull,OfferSummary',
    'MerchantID': 'All'
  }, function(err, results) {
    console.log("error: " + err);
    var newItem = itemController.createItem()
    var findItem = 0
    var returnArr = results["ItemSearchResponse"]["Items"][0]["Item"]

    for (var i = 0; i < returnArr.length; i++) {
     if (returnArr[i].hasOwnProperty('Offers')) {
       if (Number(returnArr[i]["Offers"][0]["TotalOffers"][0])>0) {
         findItem = i
         break
       }
     }
    }

    var item = results["ItemSearchResponse"]["Items"][0]["Item"][findItem]
    newItem.price = Number(item["Offers"][0]["Offer"][0]["OfferListing"][0]["Price"][0]["Amount"][0])
    newItem.name = item["ItemAttributes"][0]["Title"][0]
    newItem.thumbnail = item["SmallImage"][0]["URL"][0]
    newItem.image = item["MediumImage"][0]["URL"][0]
    newItem.amazonUrl = item["ItemLinks"][0]["ItemLink"][0]["URL"][0]
    //console.log("results: "+ newItem)
    newBasket.items.push(newItem);
    //return res.json(results);
    // if (newBasket.items.length == newBasket.rnd_budgets.length) {
    //   // res.redirect("/basket/"+newBasket.id)
    //   console.log("this should redirect to the new basket route")
    // }
    console.log(newBasket)
    console.log("new basket id " + newBasket.id)

    Basket.findOneAndUpdate(
      {_id: newBasket.id},
      {items: newBasket.items},
      function(){console.log("this is the callback")}
    )

    // Basket.find(newBasket.id).then(function(basket){
    //   console.log("success")
    //   basket.update({items: newBasket.items})
    // }, function(){console.log("failed")});
    return newBasket;
  });
  return newBasket;
}
//


function error(response, message){
  response.status(500);
  response.json({error: message})
}

var itemController = {
  createItem: function(req, res){
    var item = new Item({
      name: "",
      price: 0,
      thumbnail: "",
      image: "",
      description: ""
    });
    item.save();
    return item;
  },

  amazonCall: function(newBasket, callback){
    console.log(newBasket)
    for (var i = 0; i < newBasket.rnd_budgets.length; i++) {
      APICall(newBasket, newBasket.rnd_budgets[i])
    }
  }

}

module.exports = itemController
