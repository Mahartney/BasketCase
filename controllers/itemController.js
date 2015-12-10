var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
var env = require("../env.js")
// var apac = require("../apac")

// apac file
var util = require('util');
OperationHelper = require('../node_modules/apac').OperationHelper;

var opHelper = new OperationHelper({
  awsId: env.awsId,
  awsSecret: env.awsSecret,
  assocId: env.assocId,
});

var APICall = function(newBasket, i){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': '*',
    'ResponseGroup': 'ItemAttributes,Images,Offers,OfferFull,OfferSummary',
    'MinimumPrice': i-100,
    'MaximumPrice': i,
    'MerchandID': 'All'
  }, function(err, results) {
        console.log("error: " + err);
        var newItem = itemController.createItem()
        var findItem = 0
        var returnArr = results["ItemSearchResponse"]["Items"][0]["Item"]

        for (var i = 0; i < returnArr.length; i++) {
          if (returnArr[i].hasOwnProperty('Offers')&&returnArr[i].hasOwnProperty('ItemAttributes')&&returnArr[i].hasOwnProperty('SmallImage')&&returnArr[i].hasOwnProperty('MediumImage')&&returnArr[i].hasOwnProperty('ItemLinks')) {
            if (Number(returnArr[i]["Offers"][0]["TotalOffers"][0])>0) {
              findItem = i
              break
            }
          }
        }

    })

    var item = results["ItemSearchResponse"]["Items"][0]["Item"][findItem]
    newItem.price = Number(item["Offers"][0]["Offer"][0]["OfferListing"][0]["Price"][0]["Amount"][0])
    newItem.name = item["ItemAttributes"][0]["Title"][0]
    newItem.thumbnail = item["SmallImage"][0]["URL"][0]
    newItem.image = item["MediumImage"][0]["URL"][0]
    newItem.amazonUrl = item["ItemLinks"][0]["ItemLink"][0]["URL"][0]
    //console.log("results: "+ newItem)
    newBasket.items.push(newItem);

    //return res.json(results);
    if (newBasket.rnd_budgets.length == newBasket.items.length) {
      console.log('hey')
      console.log(newBasket)
      //res.render('basket.hbs')
    }
    // if (newBasket.items.length == newBasket.rnd_budgets.length){
    //   res.render("basket", {basket: newBasket});
    // }
}

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

  amazonCall: function(req, res){
    Basket.findById(req.params.id).then(function(basket){
      for(var i=0; i<basket.rnd_budgets.length; i++){
        console.log('hello')
          APICall(basket, basket.rnd_budgets[i])
      }
    })

  }


}

module.exports = itemController
