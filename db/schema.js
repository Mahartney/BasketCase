var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/basketcase');

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
    created_on: { type: Date, required: true, default: Date.now },
    liked: Boolean,
    items: [],
    owner: String
  });

var BasketModel = mongoose.model("Basket", BasketSchema)
var ItemModel = mongoose.model("Item", ItemSchema)
