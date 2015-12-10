require('./schema');
var mongoose = require('mongoose')
var conn = mongoose.connection;
var BasketModel = require("../models/basket")
var ItemModel = require("../models/item")

conn.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

BasketModel.remove({}, function(err){
  console.log(err)
})
ItemModel.remove({}, function(err){
  console.log(err)
})

  var basket1 = new BasketModel({
    budget: 100,
    value: 0,
    liked: false,
    items: [],
    method: getItem(){
      
    }
  })
  basket1.save();

  var basket2 = new BasketModel({
    budget: 50,
    value: 0,
    liked: false,
    items: [],
  })
  basket2.save();

  var basket3 = new BasketModel({
    budget: 25,
    value: 0,
    liked: false,
    items: [],
  })
  basket3.save();

  var item1 = new ItemModel({
    name: "Bananas",
    price: 5,
    thumbnail: "",
    image: "https://www.organicfacts.net/wp-content/uploads/2013/05/Banana21.jpg",
    description: "A 5 Dollar Thing"
  })
  item1.save();

  var item2 = new ItemModel({
    name: "Plastic Cup",
    price: 10,
    thumbnail: "",
    image: "http://www.plasticstoday.com/sites/default/files/Red-Solo-Cup.jpg",
    description: "A 10 Dollar Thing"
  })
  item2.save();

  var item3 = new ItemModel({
    name: "Headphones",
    price: 23,
    thumbnail: "",
    image: "http://www.gadgetreview.com/wp-content/uploads/2014/04/STREAMZ-01.jpg",
    description: "A 23 Dollar Thing"
  })
  item3.save();

  var item4 = new ItemModel({
    name: "Screws",
    price: 3,
    thumbnail: "",
    image: "http://media4.popsugar-assets.com/files/2015/09/15/878/n/1922153/6de294e7a93c869c_0GQ-Screws/i/Screws.jpg",
    description: "A 3 Dollar Thing"
  })
  item4.save();

  var item5 = new ItemModel({
    name: "Paper",
    price: 16,
    thumbnail: "",
    image: "http://www.imprentaonline.net/blog/wp-content/uploads/papel.jpg",
    description: "A 16 Dollar Thing"
  })
  item5.save();

  // NK: Commenting this out because we want to test attaching items to baskets
  // var baskets = [basket1, basket2, basket3]
  // var items = [item1, item2, item3, item4]


  // for(var i = 0; i < baskets.length; i++){
  //   baskets[i].items.push(items[i])
  //   baskets[i].save(function(err){
  //     if (err){
  //       console.log(err)
  //     }else {
  //       console.log("basket was saved")
  //     }
  //   })
  // }
