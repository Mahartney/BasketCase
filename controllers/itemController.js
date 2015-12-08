var express = require("express");
var app = express();
var Basket = require("../models/basket");
var Item = require("../models/item");
// var apac = require("../apac")

// apac file
var util = require('util');
OperationHelper = require('../node_modules/apac').OperationHelper;

var opHelper = new OperationHelper({
  awsId:     '',
  awsSecret: '',
  assocId:   ''
});

var APICall = function(res){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': 'harry potter',
    'ResponseGroup': 'ItemAttributes,Offers'
  }, function(err, results) {
    console.log("error: " + err);
    console.log("the next line is results: ")
    console.log(results);
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
      name: "nothing",
      price: 0,
      thumbnail: "",
      image: "",
      description: "something for nothing"
    });
    item.save();
    return item;
  },
  amazonCall: function(req, res){
    // var qwer = APICall();
    // console.log("this is what qwer is " + qwer);
    APICall(res);
  }
}

module.exports = itemController
