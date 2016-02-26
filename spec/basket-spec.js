var Basket = require('../models/basket')
var basketController = require('../controllers/basketController')

describe("a basket", function(){

  var basket, req, res;
  beforeEach(function(){
    basket = new Basket({})
  })

  it ("should be defined", function(){
    expect(basket).toBeDefined();
  })

  it ("should have a collection of items", function(){
    //expect a collection to have at least 1 item
    expect(basket.items.length).toBeDefined();
  })

  it ("should have a budget", function(){
    //expect a basket to have a budget
    expect(basket.budget).toBeDefined();
  })

  it ("should have a value", function(){
    //expect a basket to have a $ value
    expect(basket.value).toBeDefined();

  })

  it ("should have a created on date", function(){
    //expect a basket to have a created on date
    expect(basket.created_on).toBeDefined();

  })

})
