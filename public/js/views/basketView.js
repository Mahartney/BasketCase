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
    for (var i = 0; i<basket.items.length; i++){
      html.append("<div class='card col s2 item'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+basket.items[i].image+"'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>"+basket.items[i].name+"<i class='material-icons right'>more_vert</i></span><p>$"+(basket.items[i].price/100).toFixed(2)+"</p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'><i class='material-icons right'>close</i></span><p>"+basket.items[i].name+"</p><a href='"+basket.items[i].amazonUrl+"'> Buy Here</a></div></div>")
      // html.append("<h3>"+basket.items[i].name+" "+basket.items[i].price+"</h3>");
    }
    return(html);
  }

  }
