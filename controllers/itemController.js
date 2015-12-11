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
    var newItem = itemController.createItem();
    var findItem = 0;
    //checks to see if the API call was an error:
    if (results.hasOwnProperty("ItemSearchResponse") &&
    results["ItemSearchResponse"].hasOwnProperty("Items") && results["ItemSearchResponse"]["Items"][0].hasOwnProperty("Item")) {
      var returnArr = results["ItemSearchResponse"]["Items"][0]["Item"];
      //Checks to see if the first item return contains all needed properties
      for (var i = 0; i < returnArr.length; i++) {
        if(returnArr[i].hasOwnProperty('Offers') &&
        returnArr[i].hasOwnProperty('ItemAttributes') &&
        returnArr[i].hasOwnProperty('SmallImage') &&
        returnArr[i].hasOwnProperty('MediumImage') &&
        returnArr[i].hasOwnProperty('ItemLinks') &&
        Number(returnArr[i]["OfferSummary"][0]["LowestNewPrice"][0]["Amount"][0])>0) {
          findItem = i
          break
        }
      }
      //set variable of item to value of valid item from response
      var item = results["ItemSearchResponse"]["Items"][0]["Item"][findItem]
      newItem.price = Number(item["OfferSummary"][0]["LowestNewPrice"][0]["Amount"][0])
      newItem.name = item["ItemAttributes"][0]["Title"][0]
      newItem.thumbnail = item["SmallImage"][0]["URL"][0]
      newItem.image = item["MediumImage"][0]["URL"][0]
      newItem.amazonUrl = item["ItemLinks"][0]["ItemLink"][0]["URL"][0]
    } else {
      //Get Item FROM DB
      //newItem = Item.findOne({}).where('price').lt(maxPrice)
      newItem = Item.find({price:{$lt: maxPrice}},{ sort: { 'price' : -1 } }).limit(1)
    }
    // add Item to DB
    newBasket.items.push(newItem);
    Basket.findOneAndUpdate(
    {_id: newBasket.id},
    {items: newBasket.items},
    {new: true},
    function(error, results){
      if (results.items.length == results.rnd_budgets.length) {
          res.json(results)
      }
    })
  })
}

//function error(response, message){
//  response.status(500);
//  response.json({error: message})
//}

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
      if(basket.items.length !== basket.rnd_budgets.length){
        for(var i=0; i<basket.rnd_budgets.length; i++){
            console.log("Too Many?")
            APICall(basket, basket.rnd_budgets[i], req, res)
        }
      } else {
        res.json(basket)
      }
    })
  }

}

module.exports = itemController
