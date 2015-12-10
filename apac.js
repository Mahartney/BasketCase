var express = require('express');
var util = require('util');
OperationHelper = require('./node_modules/apac').OperationHelper;

var opHelper = new OperationHelper({
  awsId:     'AKIAIREWS3ETNP73H77Q',
  awsSecret: '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',
  assocId:   'testwebs0a-20'
});

var APICall = function(){
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': 'harry potter',
    'ResponseGroup': 'ItemAttributes,Offers'
  }, function(err, results) {
    console.log("error: " + err);
    console.log("the next line is results: "
    )
    console.log(results);
  });
}

module.exports = APICall;
