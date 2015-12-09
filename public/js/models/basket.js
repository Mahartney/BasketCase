var Basket= function(info){
  this.budget = info.budget;
  this.value = info.value;
  this.created_on = info.created_on;
  this.liked = info.liked;
  this.id = info.id;
  this.items = info.items
};

Basket.fetch = function(){
  var request = $.getJSON("http://localhost:3000/")
  .then(function(response) {
    console.log(response)
    var baskets = [];
    for(var i = 0; i < response.length; i++){
      baskets.push(new Basket(response[i]));
    }
    return baskets;
    console.log(baskets)
    })
  .fail(function(response){
      console.log(response);
    });
  return request;
};

Basket.prototype = {
  create: function(basketData){
    var self = this;
    var request = $.ajax({
      url: '/baskets',
      method: 'post',
      data: JSON.stringify(basketData),
      contentType: 'application/json'
    }).then(
      function(newBasketInfo) {
        self.showBasket();
      }
    );
    return request;
  }
}
