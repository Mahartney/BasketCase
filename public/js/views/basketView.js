var BasketView = function(basket){
  this.basket = basket;
  this.$el = $("<div class='row'></div>");
  this.render();
  $(".basket").append(this.$el);
};

BasketView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.basketTemplate());
  },

  basketTemplate: function(){
    var basket = this.basket;
    var html = $("<div class='section'>");
    html.append("<h5>You could buy:</h5>");
    var col_num; //sets column width for materialize based on number of items
      switch (basket.items.length){
        case 1: col_num = "s5"
          break;
        case 2: col_num = "s4"
          break;
        case 3: col_num = "s3"
          break;
        case 4: col_num = "s2"
          break;
        case 5: col_num = "s2"
          break;
      }
    for (var i = 0; i<basket.items.length; i++){
      html.append("<div class='card small col "+col_num+" item'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+basket.items[i].image+"'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>"+basket.items[i].name+"<p>$"+(basket.items[i].price/100).toFixed(2)+"</p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'><i class='material-icons right'>close</i></span><p>"+basket.items[i].name+"</p><a href='"+basket.items[i].amazonUrl+"'> Buy Here</a></div></div>")
    }
    return(html);
  }

  }
