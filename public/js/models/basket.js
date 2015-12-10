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

popMostRecent = function(){
  var request = $.getJSON("/mostRecent")
  .then(function(response) {
    console.log(response);
    var baskets = [];
    var html = $(".mostRecent")
    html.empty();
    for (var i = 0; i < response.length; i++) {
      var itemThumbnails = $("<p>");
      var li = $("<li>");
      var header = $("<div class ='collapsible-header truncate'>"+ response[i].items[0].name + "</div>");
      var body = $("<div class ='collapsible-body'>");
      for (var j = 0; j < response[i].items.length; j++) {
        itemThumbnails.append("<img class ='thumbnail' src='" + response[i].items[j].thumbnail + "'>")
      };
      body.append(itemThumbnails)
      li.append(header);
      li.append(body);
      html.append(li);
    };
    }).fail(function(response){
      console.log("2");
    });
  return request;

}
