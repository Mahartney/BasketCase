var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
var util = require('util');
var env = require('../env.js')
OperationHelper = require('../node_modules/apac').OperationHelper;

var randomWord = require("./helpers/keyword.js")


var opHelper = new OperationHelper({
  awsId:     env.awsId,
  awsSecret: env.awsSecret,
  assocId:   env.assocId
  // awsId:     process.env.AWS_ID,
  // awsSecret: process.env.AWS_SECRET,
  // assocId:   process.env.ASSOC_ID
  }
);

var APICall = function(newBasket, maxPrice, req, res){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': randomWord(),
    'MaximumPrice': maxPrice,
    'MinimumPrice': maxPrice - 100,
    'ResponseGroup': 'ItemAttributes,Images,Offers,OfferFull,OfferSummary',
    'MerchantID': 'All'
  }, function(err, results) {
        console.log("error: " + err);
        var newItem = itemController.createItem();
        var findItem = 0;

        if (results.hasOwnProperty("ItemSearchResponse") && results["ItemSearchResponse"].hasOwnProperty("Items") && results["ItemSearchResponse"]["Items"][0].hasOwnProperty("Item")) {

          var returnArr = results["ItemSearchResponse"]["Items"][0]["Item"];

          for (var i = 0; i < returnArr.length; i++) {
            if (returnArr[i].hasOwnProperty('Offers')&&returnArr[i].hasOwnProperty('ItemAttributes')&&returnArr[i].hasOwnProperty('SmallImage')&&returnArr[i].hasOwnProperty('MediumImage')&&returnArr[i].hasOwnProperty('ItemLinks')) {
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

        console.log(newBasket)
        console.log("new basket id " + newBasket.id)

        Basket.findOneAndUpdate(
         {_id: newBasket.id},
         {items: newBasket.items},{new: true},
         function(error, results){
           console.log("err: " + err);
           if (results.items.length == results.rnd_budgets.length) {
             res.json(results)
           }
         }
       )

     } else {
       console.log(newBasket.rnd_budgets)

       var newRnd_budget = newBasket.rnd_budgets.pop()

       Basket.findOneAndUpdate(
         {_id: newBasket.id},
         {rnd_budgets: newRnd_budget},
         function(err,res){
           console.log("Hey: " + err)
         }
       )
      console.log("After: ")
     }

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

  amazonCall: function(req, res){
    Basket.findById(req.params.id).then(function(basket){
      if(basket.items.length < basket.rnd_budgets.length){
        for(var i=0; i<basket.rnd_budgets.length; i++){
            APICall(basket, basket.rnd_budgets[i], req, res, i)
        }
      } else {
        res.json(basket)
      }
    })
  }

}

module.exports = itemController
