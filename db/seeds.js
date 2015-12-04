var mongoose = require('mongoose')
//var conn = mongoose.connect('mongodb://localhost/basketcase')
var BasketModel = require("../models/basket")
var ItemModel = require("../models/item")
//BasketModel.remove({}, function(err){
//  console.log(err)
//})
//ItemModel.remove({}, function(err){
//  console.log(err)
//})

var basket1 = new BasketModel({
  budget: 100,
  value: 90,
  created_on: '12/04/2015',
  liked: true,
})

var basket2 = new BasketModel({
  budget: 50,
  value: 49,
  created_on: '12/04/2015',
  liked: true,
})

var basket3 = new BasketModel({
  budget: 25,
  value: 23,
  created_on: '12/04/2015',
  liked: false,
})

var item1 = new ItemModel({
  price: 90,
  thumbnail: "",
  image: "",
  description: "A 90 Dollar Thing",
})

var item2 = new ItemModel({
  price: 49,
  thumbnail: "",
  image: "",
  description: "A 49 Dollar Thing",
})

var item3 = new ItemModel({
  price: 23,
  thumbnail: "",
  image: "",
  description: "A 23 Dollar Thing",
})

var baskets = [basket1, basket2, basket3]
var items = [item1, item2, item3]

for(var i = 0; i < baskets.length; i++){
  baskets[i].items.push(items[i])
  baskets[i].save(function(err){
    if (err){
      console.log(err)
    }else {
      console.log("basket was saved")
    }
  })
}
