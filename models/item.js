require("../db/schema");
var mongoose = require("mongoose");

var ItemModel = mongoose.model("Item");
module.exports = ItemModel;
