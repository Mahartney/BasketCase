var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/basketcase');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId


//define schema for item
var ItemSchema = new Schema({
    price: Number,
    thumbnail: String,
    image: String,
    description: String,
  });

//define schema for basket
var BasketSchema = new Schema({
    budget: Number,
    value: Number,
    created_on: String,
    liked: Boolean,
    items: [ItemSchema],
  });

var BasketModel = mongoose.model("Basket", BasketSchema)
var ItemModel = mongoose.model("Item", ItemSchema)
