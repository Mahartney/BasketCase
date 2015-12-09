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

var searchParams = function(itemPrice) {
  'SearchIndex': 'All',
  'Keywords': randomKeyword();
  'MaximumPrice': itemPrice;
  'MinimumPrice': itemPrice - 100;
  'ResponseGroup': 'ItemAttributes,Offers'
}

var randomKeyword = function(){
  var keywordLibrary = ['book', 'screw', 'baseball', 'orange', 'jello', 'nuclear'];
  var keyword = keywordLibrary[Math.floor(Math.random() * keywordLibrary.length)];
  return keyword;
}
