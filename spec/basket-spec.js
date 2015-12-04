
describe("basket", function(){

  it ("should have a budget", function(){
    //expect a basket to have a budget
    avar budget = 10
    expect(budget).toBeGreaterThan(0);

    //var basket = 10
    //var basket = 10
    //expect(basket).toBeGreaterThan(0);
  })

  it ("should have a collection of items", function(){
    //expect a collection to have at least 1 item
    expect(budget).toBeGreaterThan(12);
    //expect(basket.items.length).toBeGreaterThan(0);
  })

  it ("should have a value", function(){
    //expect a basket to have a $ value
    expect(basket.value).toBeGreaterThan(0);

  })

  it ("should have a created on date", function(){
    //expect a basket to have a created on date
    expect(basket.created_on).toBeDefined();

  })

  it ("should have a like option", function(){
    //expect a basket to have a like option
    expect(basket.liked).toBeDefined();

  })

})

describe("item", function(){

  it("should have a value", function(){
    //expect an item to have a value
    expect(item.value).toBeDefined();

  })

  it("should have a picture", function(){
    //expect an item to have a picture
    expect(item.picture).toBeDefined();
  })

  it("should have a description", function(){
    //expect an item to have a description
    expect(item.description).toBeDefined();

  })
})
