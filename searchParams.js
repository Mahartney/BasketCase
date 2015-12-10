// for the following code:

// var APICall = function(res, maxPrice){
//   opHelper.execute('ItemSearch', {
//     'SearchIndex': 'All',
//     'Keywords': '*',
//     'MaximumPrice': maxPrice,
//     'MinimumPrice': maxPrice - 100,
//     'ResponseGroup': 'ItemAttributes,Offers'
//   }, function(err, results) {
//     console.log("error: " + err);
//     console.log("the next line is results: ")
//     console.log(results);
//     return res.json(results);
//   });
// }

// we want a function that generates the second argument to APICall
// this function should return an object
// should it be an object constructor?

var searchParams = function Search(maxPrice){
  this.SearchIndex = 'All',
  this.Keywords = 'balls',
  this.MaximumPrice = maxPrice,
  this.MinimumPrice = maxPrice - 100,
  this.ResponseGroup = 'ItemAttributes,Images,Offers,OfferFull,OfferSummary',
  this.MerchantID = 'All'
}

var randomKeyword = function(){
  var keywordLibrary = ['book', 'screw', 'baseball', 'orange', 'jello', 'nuclear'];
  var keyword = keywordLibrary[Math.floor(Math.random() * keywordLibrary.length)];
  return keyword;
}

module.exports = searchParams
