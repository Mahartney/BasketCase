var express = require('express');
var util = require('util');
OperationHelper = require('./node_modules/apac').OperationHelper;

var opHelper = new OperationHelper({
  awsId:     '',
  awsSecret: '',
  assocId:   ''
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
