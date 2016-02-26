var Basket = require('../models/basket')

describe("a basket", function(){

  var basket = new Basket

  it ("should have a collection of items", function(){
    //expect a collection to have at least 1 item
    expect(basket.items.length).toBeGreaterThan(0);
  })

  it ("should have a budget", function(){
    //expect a basket to have  a budget
    expect(budget).toBeGreaterThan(0);
  })

  it ("should have a value", function(){
    //expect a basket to have a $ value
    expect(basket.value).toBeGreaterThan(0);

  })

  it ("should have a created on date", function(){
    //expect a basket to have a created on date
    expect(basket.created_on).toBeDefined();

  })

})
