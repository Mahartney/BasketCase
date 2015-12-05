require("../db/schema");
var mongoose = require("mongoose");

var BasketModel = mongoose.model("Basket");
module.export = BasketModel;
