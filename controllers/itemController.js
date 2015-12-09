var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
var basketController = require("./basketController")
// var apac = require("../apac")

// apac file
var util = require('util');
OperationHelper = require('../node_modules/apac').OperationHelper;

var opHelper = new OperationHelper({
  awsId: "AKIAJHL2YSB3NNWOM2KQ",
  awsSecret: "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",
  assocId: "testwebsit056-20"
});

// ASIN no price "B018W4GC34"
var APICall = function(res){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': '*',
    'ResponseGroup': 'ItemAttributes,Images,Offers,Variations',
    'MinimumPrice': '1'
  }, function(err, results) {
    console.log("error: " + err);
    console.log("the next line is results: ")
    //console.log(results);
    var newItem = itemController.createItem()
    var item = results["ItemSearchResponse"]["Items"][0]["Item"][0]["ItemAttributes"][0]
  //  newItem.price = item["ItemAttributes"][0]["ListPrice"][0]["Amount"][0]
  //  newItem.name = item["ItemAttributes"][0]["Title"][0]
  //  newItem.thumbnail = item["SmallImage"][0]["URL"][0]
  //  newItem.image = item["MediumImage"][0]["URL"][0]
    console.log(newItem)
    console.log(item)
    return res.json(results);
  });
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
  amazonCall: function(req, res){
    // var qwer = APICall();
    // console.log("this is what qwer is " + qwer);
    var basket = basketController.createBasket()
    var getItem = APICall(res);
    basket.items.push(getItem)
  }
}

module.exports = itemController
