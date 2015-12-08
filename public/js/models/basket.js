var Basket= function(info){
  this.budget = info.budget;
  this.value = info.value;
  this.created_on = info.created_on;
  this.liked = info.liked;
  this.id = info.id;
  this.items = info.items
};

var Item = function(info){
  this.name = info.name;
  this.price = info.price;
  this.thumbnail = info.thumbnail;
  this.image = info.image;
  this.description = info.description;
}

Basket.fetch = function(){
  var request = $.getJSON("http://localhost:3000/.json")
  .then(function(response) {
    var baskets = [];
    for(var i = 0; i < response.length; i++){
      baskets.push(new Basket(response[i]));
    }
    console.log(baskets)
    return baskets;
    })
  .fail(function(response){
      console.log("2");
    });
  return request;
};

popMostRecent = function(){
  var request = $.getJSON("http://localhost:3000/.json")
  .then(function(response) {
    console.log(response);
    var items = [];
    for(var i = 0; i < response.length; i++){
      items.push(new Item(response[i]));
    }
    $(".mostRecent").empty();
    for (var i = 0; i < items.length; i++) {
      $(".mostRecent").append("<div>"+items[i].description+"</div>")
    };
    })
  .fail(function(response){
      console.log("2");
    });
  return request;

}
