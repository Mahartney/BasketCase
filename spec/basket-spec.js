
// describe ("a basket", function(){
//   it ("should be an object", function(){
//
//   });
//
//   it ("should have an array of items", function(){
//
//   });
//
//   it ("should have a budget", function(){
//
//   });
//
//   it ("should have a total cost", function(){
//
//   });
//
//   describe ("a basket created by a registered user", function(){
//     it ("should have a creator", function(){
//
//     });
//   });
//
// });

  // it should have items
  // it should have a budget
  // it should have a total cost
  // it should have a user if it is created by a user

describe("a basket", function(){

  it ("should have a budget", function(){

    expect(budget).toBeGreaterThan(0);

  })

  it ("should have a collection of items", function(){
    //expect a collection to have at least 1 item

    expect(basket.items.length).toBeGreaterThan(0);
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
