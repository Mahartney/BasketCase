var BasketView = function(basket){
  this.basket = basket;
  this.$el = $("<div class='basket'></div>");
  this.render();
  $(".baskets").append(this.$el);
};

BasketView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.basketTemplate());
  },

  basketTemplate: function(){
    var basket = this.basket;
    var html = $("<div>");
    html.append("<h3>This is a basket</h3>");
    return(html);
  }
};
