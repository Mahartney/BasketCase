var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basketcase');

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId


//define schema for item
var ItemSchema = new Schema({
    name: String,
    price: Number,
    thumbnail: String,
    image: String,
    amazonUrl: String,
  });

//define schema for basket
var BasketSchema = new Schema({
    budget: Number,
    rnd_budgets: [],
    value: Number,
    created_on: String,
    liked: Boolean,
    items: [{type: ObjectId, ref:"Item"}]
  });

var BasketModel = mongoose.model("Basket", BasketSchema)
var ItemModel = mongoose.model("Item", ItemSchema)
