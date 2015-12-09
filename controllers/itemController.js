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

var APICall = function(res){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': '*',
    'ResponseGroup': 'ItemAttributes,Images,Offers,OfferFull,OfferSummary',
    'MinimumPrice': 2585,
    'MaximumPrice': 2585,
    'MerchandID': 'All'
  }, function(err, results) {
    console.log("error: " + err);
    console.log("the next line is results: ")
    //console.log(results);
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
    console.log(findItem)

    var item = results["ItemSearchResponse"]["Items"][0]["Item"][findItem]
    newItem.price = Number(item["Offers"][0]["Offer"][0]["OfferListing"][0]["Price"][0]["Amount"][0])
    newItem.name = item["ItemAttributes"][0]["Title"][0]
    newItem.thumbnail = item["SmallImage"][0]["URL"][0]
    newItem.image = item["MediumImage"][0]["URL"][0]
    newItem.amazonUrl = item["ItemLinks"][0]["ItemLink"][0]["URL"][0]
    console.log("results: "+ newItem)
    return newItem;
    //return res.json(results);
  });
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

  amazonCall: function(newBasket){
    console.log(newBasket)
    var i = 0
    pizza = true
    while(pizza){
      if (newBasket.items.length == newBasket.rnd_budgets.length) {
        pizza = false;
        break
      }
      while(i < newBasket.rnd_budgets.length) {
        newBasket.items.push(APICall(newBasket.rnd_budgets[i]))
        i++
        }
      console.log("Hello")
    }

  }//.next(DOM MANIPULATION)


}

module.exports = itemController
